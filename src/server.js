/// <reference path="./lib/express.d.ts" />
/// <reference path="./lib/serve-static.d.ts" />
/// <reference path="./lib/mime.d.ts" />
/// <reference path="./lib/socketIO.d.ts" />
var express = require("express");
var sio = require("socket.io");
var http = require("http");
var Server = (function () {
    function Server() {
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.io = sio.listen(this.httpServer);
        console.log();
        //routage sur index.html
        this.app.get('/', function (req, res) {
            res.sendFile(__dirname + '/index.html');
        });
        //ajout des dépendences
        this.app.use(express.static(__dirname + '/'));
        //connexion & deconnexion
        this.io.on('connection', function (socket) {
            console.log('a user connected');
            socket.on('disconnect', function () {
                console.log('user disconnected');
            });
        });
        //montage du server
        this.httpServer.listen(8080, function () {
            console.log('listening on *:8080');
        });
    }
    return Server;
})();
new Server();
//# sourceMappingURL=server.js.map