import {User} from './app/model/user';
import {NVNode} from './app/model/node';
import {Branch} from './app/model/branch';
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
            
            socket.on('broadcast users srv',(user) => {
                var b = new Branch();
                var n = new NVNode(b);n.image_path = user._node._image_path;
                var u = new User(user._mail,user._id,n);
                u.socket = socket.id;
                this.users.push(u);
                socket.broadcast.emit('broadcast users clt',u)
            });
            socket.on('add node srv',(node, edge) => {
                socket.broadcast.emit('add node clt', node, edge);
            });

            socket.on('del node srv', (node) => {
                socket.broadcast.emit('del node clt', node);
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