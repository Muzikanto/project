import actions from "../../../src/actions";
import * as SocketIO from "socket.io";
import {IChessStart, IChessState} from "../../../src/features/Chess/Chess.typings";
import Chess from "../../../src/features/Chess/Chess";
import {IChessOptions} from "../../../src/reducers/Chess/Chess.typings";

export const connectChessSockets = (socket: SocketIO.Socket, io: SocketIO.Server) => {
    const nick = socket.client.request.user.nick;

    socket.on(actions.CHESS_SEND, (data: IChessState) => {
        delete data.player;
        delete data.current;
        socket.broadcast.emit(actions.ON_CHESS_RESPONSE, data)
    });

    socket.on(actions.CHESS_START, ({users, room}: IChessStart) => {
        const response: IChessOptions = {
            state: Chess.createChessState(true),
            room,
            users,
        };

        io.sockets.clients((err: Error, clients: string[])=>{
            if (room) {
                if (!err && clients && clients.length > 1) {
                    io.sockets.connected[clients[0]].emit(actions.ON_CHESS_START, response);
                    response.state.player = 'black';
                    io.sockets.connected[clients[1]].emit(actions.ON_CHESS_START, response);
                } else {
                    socket.emit(actions.ON_CHESS_ERROR, "Need two players");
                }
            } else {
                socket.emit(actions.ON_CHESS_ERROR, "Please Join to Room");
            }
        });
    });

    socket.on(actions.CHESS_JOIN, (room: string) => {
        socket.join(room);
        io.sockets.emit(actions.ON_CHESS_JOIN, {nick, room})
    });
};
