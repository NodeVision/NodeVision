import {bootstrap, View, Component, FormBuilder, CORE_DIRECTIVES} from 'angular2/angular2';
import {Branch} from './app/model/branch';
import {NVNode} from './app/model/node';
import {NVEdge} from './app/model/edge';
import {Attribute} from './app/model/attribute';

/// <reference path="./lib/express.d.ts" />
/// <reference path="./lib/serve-static.d.ts" />
/// <reference path="./lib/mime.d.ts" />
/// <reference path="./lib/socketIO.d.ts" />

import * as express from "express";
import * as sio from "socket.io";
import * as http from "http";

class Server {
    private app = express();
    private httpServer = http.createServer(this.app);
    private io = sio.listen(this.httpServer);
    private neo4j = require('neo4j-io')("http://5.196.66.87:80");

    constructor() {
        //routage sur index.html
        this.app.get('/', function (req, res) {
            res.sendFile(__dirname + '/index.html');
        });
        //ajout des dépendences
        this.app.use(express.static(__dirname + '/'));
        //connexion & deconnexion
        this.io.on('connection', (socket: SocketIO.Socket) => {
            var date = new Date();
            console.log(date+' : a user connected '+socket.id);

            // Création d'un noeud coté serveur
            socket.on('add node srv',(user, node) => {
                var b = new Branch(node._branch._name,node._branch._color,node._branch._id);
                var n = new NVNode(b,node._id,node._name,node._node_attributs);
                var response = this.neo4j.query("MATCH (n),(b),(u) WHERE id(n)={id_node} AND id(b)={id_branch} AND id(u)={id_user} CREATE n-[r:HIERARCHICAL { name:'undefined'}]->(c:Node {name:'undefined'})<-[re:BELONG]-b, (u)-[rel:WRITE]->(c) RETURN r,c", { id_node: node._id, id_branch : node._branch._id, id_user : user._node._id });
                response.then(    
                    (val) => {
                        var Nnode = new NVNode(b, val.data[0][1].metadata.id, val.data[0][1].data.name, Array<Attribute>());
                        var Nedge = new NVEdge(val.data[0][0].metadata.id, val.data[0][0].data.name, n, Nnode);
                        socket.broadcast.emit('add node clt', Nnode, Nedge);
                        socket.emit('add node clt', Nnode, Nedge);
                    }
                ).catch(
                    function() { 
                        console.log("Erreur dans la creation du noeud"+ node._id+"  "+ node._branch._id+" "+ user._node._id);
                    }
                );
            });

            socket.on('del node srv', (node, isLastNode) => {
                console.log(isLastNode);
                if(isLastNode > 1){ var response = this.neo4j.query("MATCH (n) WHERE id(n)={id_node} detach delete n", { id_node: node._id });}
                else {var response = this.neo4j.query("MATCH (b),(n) WHERE id(b)={id_branch} AND (b)-->(n) detach delete b,n", { id_node: node._id, id_branch : node._branch._id });}
                 response.then(    
                    () => {
                        socket.broadcast.emit('del node clt', node);
                        socket.emit('del node clt', node);
                    }
                ).catch(
                    function() { 
                        console.log("Erreur dans la suppression du noeud");
                    }
                );
            });

            socket.on('up node srv', (node, name) => {
                socket.broadcast.emit('up node clt', node, name);
            });

            socket.on('add branch srv', (node) => {
                socket.broadcast.emit('add branch clt', node);
            });

            socket.on('del branch srv', (branch) => {
                socket.broadcast.emit('del branch clt', branch);
            });
            
            socket.on('up branch srv', (branch) => {
                socket.broadcast.emit('up branch clt', branch);
            });

            socket.on('add edge srv', (edge, source, target) => {
                socket.broadcast.emit('add edge clt', edge, source, target);
            });

            socket.on('del edge srv', (source, target) => {
                socket.broadcast.emit('del edge clt', source, target);
            });

            socket.on('up edge srv', (name, edge) => {
                socket.broadcast.emit('up edge clt', name, edge);
            });

            socket.on('add attr srv', (node, attribute) => {
                socket.broadcast.emit('add attr clt', node, attribute);
            });

            socket.on('del attr srv', (node, attribute) => {
                socket.broadcast.emit('del attr clt', node, attribute);
            });

            socket.on('up attr srv', (type, node, attribute, value, name) => {
                socket.broadcast.emit('up attr clt', type, node, attribute, value, name);
            });

            socket.on('disconnect', function () {
                console.log('user disconnected '+socket.id);
            });
        });
        //montage du server
        this.httpServer.listen(8888, function () {
            console.log('listening on *:8888');
        });
    }
}
new Server(); 