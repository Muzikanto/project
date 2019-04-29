import {Socket} from "socket.io";
import {socketCheckAuth, socketSessionReload} from "./init";
import {Server} from "http";
import {SocketChessHod} from "./Chess";

export const connectSocket = (server: Server) => {
    const io: any = require('socket.io').listen(server);
    io.set('origins', '*:*');
    io.set('authorization', socketCheckAuth);
    io.sockets.on('sessionReload', socketSessionReload(io));

    io.sockets.on('connection', (socket: Socket) => {
        // const username = socket.client.request.user.name;
        console.log(socket.client.id);
        socket.on('CHESS_SEND', SocketChessHod(io));
    });
    return io;
};
