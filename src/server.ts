import {Branch} from './app/model/branch';
import {NVNode} from './app/model/node';
import {NVEdge} from './app/model/edge';
import {Attribute} from './app/model/attribute';
import {User} from './app/model/user';

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
    private users = Array<User>();
    constructor() {
        express().request
        //routage sur index.html
        this.app.get('/',(req, res) => {
            res.sendFile(__dirname + '/index.html');
        });
        //ajout des dépendences
        this.app.use(express.static(__dirname + '/'));
        //connexion & deconnexion
        this.io.on('connection', (socket: SocketIO.Socket) => {
            var date = new Date();
            console.log(date+' : a user connected '+socket.id);

            //Connexion d'un nouvel utilisateur
            socket.on('broadcast users srv',(user) => {
                var b = new Branch();
                var n = new NVNode(b);n.image_path = user._node._image_path;
                var u = new User(user._mail,user._id,n);
                u.socket = socket.id;
                this.users.push(u);
                socket.broadcast.emit('broadcast users clt',u)
            });

            // Création d'un noeud
            socket.on('add node srv', (user, node) => {
                var b = new Branch(node._branch._name, node._branch._color, node._branch._id);
                var n = new NVNode(b, node._id, node._name, node._node_attributs);
                var response = this.neo4j.query("MATCH (n),(b),(u) WHERE id(n)=" + node._id + " AND id(b)=" + node._branch._id + " AND id(u)=" + user._node._id + " CREATE n-[r:HIERARCHICAL { name:'undefined'}]->(c:Node {name:'undefined'})<-[re:BELONG]-b, (u)-[rel:WRITE]->(c) RETURN r,c");
                response.then(
                    (val) => {
                        var Nnode = new NVNode(b, val.data[0][1].metadata.id, val.data[0][1].data.name, Array<Attribute>());
                        var Nedge = new NVEdge(val.data[0][0].metadata.id, val.data[0][0].data.name, n, Nnode);
                        socket.broadcast.emit('add node clt', Nnode, Nedge);
                        socket.emit('add node clt', Nnode, Nedge);
                    }
                ).catch(
                    function() {
                        console.log("Erreur dans la creation du noeud");
                    }
                    );
            });

            // Suppression d'un noeud
            socket.on('del node srv', (node, NbNode) => {
                var del_branch = false;
                if (NbNode > 1) { var response = this.neo4j.query("MATCH (n) WHERE id(n)=" + node._id + " detach delete n"); del_branch = false; }
                else { var response = this.neo4j.query("MATCH (b),(n) WHERE id(b)=" + node._branch._id + " AND (b)-->(n) detach delete b,n"); del_branch = true; }
                 response.then(    
                    () => {
                        socket.broadcast.emit('del node clt', node._id, del_branch, node._branch._id);
                        socket.emit('del node clt', node._id, del_branch, node._branch._id);
                    }
                ).catch(
                    function() { 
                        console.log("Erreur dans la suppression du noeud");
                    }
                );
            });

            // Création d'un noeud et de ses enfants coté serveur
            socket.on('del node & sons srv', (node, NbNode) => {
                var response = this.neo4j.query("MATCH (n:Node)-[r:HIERARCHICAL*]->(s:Node) WHERE id(n) = " + node._id + " return s");
                var del_branch = false;
                response.then(
                    (val) => {
                        if (val.data.length + 1 == NbNode) {
                            var response2 = this.neo4j.query("MATCH (b),(n:Node)-[r:HIERARCHICAL*]->(s:Node) WHERE id(n) = " + node._id + " AND id(b)=" + node._branch._id + " detach delete b,n,s");
                            del_branch = true;
                        }else{
                            var response2 = this.neo4j.query("MATCH (n:Node)-[r:HIERARCHICAL*]->(s:Node) WHERE id(n) = " + node._id + " detach delete s,n");
                            del_branch = false;
                        }
                        response2.then(
                            () => {
                                val.data.forEach(valeur => {
                                    socket.broadcast.emit('del node & clt', valeur[0].metadata.id);
                                    socket.emit('del node clt', valeur[0].metadata.id);
                                });
                                socket.broadcast.emit('del node clt', node._id, del_branch, node._branch._id);
                                socket.emit('del node clt', node._id, del_branch, node._branch._id);
                            }
                        ).catch(
                            function() {
                                console.log("Erreur dans la suppression du noeud et de ses fils 2");
                            }
                        );
                    }
                ).catch(
                    function() {
                        console.log("Erreur dans la suppression du noeud et de ses fils");
                    }
                );
            });

            // Mise à jour d'un noeud et de ses enfants coté serveur
            socket.on('up node srv', (node) => {
                var response = this.neo4j.query("MATCH (n) WHERE id(n)=" + node._id + " SET n.name ='" + node._name + "'");
                response.then(
                    () => {
                        socket.broadcast.emit('up node clt', node);
                        socket.emit('up node clt', node);
                    }
                ).catch(
                    function() {
                        console.log("Erreur dans la mise à jour du noeud");
                    }
                );
                
            });

			// Création d'une branche
            socket.on('add branch srv', (branch, user) => {
                var response = this.neo4j.query("MATCH(u) WHERE id(u) = " + user._node._id + " CREATE (b:Branch {name: '" + branch._name + "', color: '" + branch._color + "' }) - [re:BELONG] ->(n:Node {name: 'undefined' }) < -[r:WRITE] - u RETURN b, n");
                response.then(
                    (val) => {
                        socket.broadcast.emit('add branch clt', val.data[0][0].metadata.id, val.data[0][0].data.name, val.data[0][0].data.color, val.data[0][1].metadata.id);
                        socket.emit('add branch clt', val.data[0][0].metadata.id, val.data[0][0].data.name, val.data[0][0].data.color, val.data[0][1].metadata.id);
                    }
                ).catch(
                    function() {
                        console.log("Erreur dans la création de la branche");
                    }
                );
            });

			// Suppression d'une branche
            socket.on('del branch srv', (branch) => {
                 var response = this.neo4j.query("MATCH (b),(n) WHERE id(b)="+branch._id+" AND (b)-->(n) detach delete b,n");
                 response.then(    
                    () => {
                        socket.broadcast.emit('del branch clt', branch);
                        socket.emit('del branch clt', branch);
                    }
                ).catch(
                    function() { 
                        console.log("Erreur dans la suppression de la branche");
                    }
                );
            });
            
            // Mise à jour d'une branche
            socket.on('up branch srv', (branch) => {
                var response = this.neo4j.query("MATCH (b) WHERE id(b)=" + branch._id + " SET b.name='" + branch._name + "', b.color ='" + branch._color + "'");
                response.then(
                    () => {
                        socket.broadcast.emit('up branch clt', branch);
                        socket.emit('up branch clt', branch);
                    }
                ).catch(
                    function() {
                        console.log("Erreur dans l'update de la branche");
                    }
                );
            });

			// Création d'un arc
            socket.on('add edge srv', (edge) => {
                var response = this.neo4j.query("MATCH (s),(t) WHERE id(s)="+edge.source._id+" AND id(t)="+edge.target._id+" CREATE (s)-[r:CUSTOM { name:'undefined'}]->(t) RETURN r");
                response.then(
                    (val) => {
                        socket.broadcast.emit('add edge clt', edge, val.data[0][0].metadata.id);
                        socket.emit('add edge clt', edge, val.data[0][0].metadata.id);
					 }
                ).catch(
                    function() {
                        console.log("Erreur dans la création de l'arc");
                    }
                );
            });

			// Suppression d'un arc
            socket.on('del edge srv', (edge) => {
                 var response = this.neo4j.query("MATCH ()-[r]-() WHERE id(r)="+edge._id+" delete r");
                 response.then(    
                    () => {
                        socket.broadcast.emit('del edge clt', edge);
                        socket.emit('del edge clt', edge);
                    }
                ).catch(
                    function() { 
                        console.log("Erreur dans la suppression de l'arc");
                    }
                );
            });

			// Mise à jour d'un arc
            socket.on('up edge srv', (edge) => {
            	var response = this.neo4j.query("MATCH ()-[r]-() WHERE id(r)="+edge._id+" SET r.name ='"+edge._name+"'");
                response.then(
                    (val) => {
                        socket.broadcast.emit('up edge clt', edge);
                        socket.emit('up edge clt', edge);
                    }
                ).catch(
                    function() {
                        console.log("Erreur dans l'update de l'arc");
                    }
                );
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

            socket.on('disconnect', () => {
                var u = this.users.find(u => u.socket == socket.id);
                socket.broadcast.emit('broadcast user disconnect',u);
                console.log('user disconnected '+socket.id);
            });
        });
        //montage du server
        this.httpServer.listen(8888, () => {
            console.log('listening on *:8888');
        });
    }
}
new Server();
