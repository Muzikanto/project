import {Socket} from "socket.io";
import {socketCheckAuth, socketSessionReload} from "./init";
import {Socket_new_message} from "./Messages";
import {Server} from "http";

export const connectSocket = (server: Server) => {
    const io: any = require('socket.io').listen(server);
    io.set('origins', '*:*');
    io.set('authorization', socketCheckAuth);
    io.sockets.on('sessionReload', socketSessionReload(io));

    io.sockets.on('connection', (socket: Socket) => {
        // const username = socket.client.request.user.name;
        socket.on('new_message_send', Socket_new_message(io));
    });
    return io;
};
