import * as SocketIO from "socket.io";
import {Socket} from "socket.io";
import {socketCheckAuth, socketSessionReload} from "./connect";
import {Server} from "http";
// import {connectChessSockets} from "./Chess/Chess";

export const connectSocket = (server: Server) => {
    const io: any = require('socket.io').listen(server);

    io.set('origins', '*:*');
    io.set('authorization', socketCheckAuth);
    io.sockets.on('sessionReload', socketSessionReload(io));

    io.sockets.on('connection', (socket: Socket) => {
        // console.log(socket.client.id);
        const arr: Array<(socket: SocketIO.Socket, io: SocketIO.Server) => void> = [
          // connectChessSockets,
        ];

        arr.map(func => func(socket, io));
    });

    return io;
};
