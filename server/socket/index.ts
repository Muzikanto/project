import {Socket} from "socket.io";
import {socketCheckAuth, socketSessionReload} from "./connect";
import {Server} from "http";
import {SocketChessHod} from "./Chess";
import actions from "../../src/actions";

export const connectSocket = (server: Server) => {
    const io: any = require('socket.io').listen(server);
    io.set('origins', '*:*');
    io.set('authorization', socketCheckAuth);
    io.sockets.on('sessionReload', socketSessionReload(io));

    io.sockets.on('connection', (socket: Socket) => {
        // const username = index.client.request.user.name;
        console.log(socket.client.id);
        socket.on(actions.CHESS_SEND, SocketChessHod(io, socket));
    });
    return io;
};
