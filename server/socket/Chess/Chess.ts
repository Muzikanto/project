import {actionsChessTypes} from "../../../src/reducers/Chess/Chess.actions";
import * as SocketIO from "socket.io";
import {IChessStart, IChessState} from "../../../src/pages/ChessPage/ChessPage.components/Chess/Chess.typings";
import Chess from "../../../src/pages/ChessPage/ChessPage.components/Chess/Chess";
import {IChessOptions} from "../../../src/reducers/Chess/Chess.typings";

export const connectChessSockets = (socket: SocketIO.Socket, io: SocketIO.Server) => {
    const nick = socket.client.request.user.nick;

    socket.on(actionsChessTypes.CHESS_SEND, ({state, room}: { state: IChessState, room: string }) => {
        delete state.player;
        socket.broadcast.to(room).emit(actionsChessTypes.ON_CHESS_RESPONSE, state)
    });

    socket.on(actionsChessTypes.CHESS_START, ({users, room}: IChessStart) => {
        const response: IChessOptions = {
            state: Chess.createChessState(true),
            room,
            users,
        };

        io.sockets.in(room).clients((err: Error, clients: string[]) => {
            if (room) {
                if (!err && clients && clients.length > 1) {
                    socket.emit(actionsChessTypes.ON_CHESS_START, response);
                    response.state.player = 'black';
                    socket.broadcast.to(room).emit(actionsChessTypes.ON_CHESS_START, response);
                } else {
                    socket.emit(actionsChessTypes.ON_CHESS_ERROR, "Need two players");
                }
            } else {
                socket.emit(actionsChessTypes.ON_CHESS_ERROR, "Please Join to Room");
            }
        });
    });

    socket.on(actionsChessTypes.CHESS_JOIN, (room: string) => {
        socket.join(room);

        const response = {nick, room};

        io.to(room).emit(actionsChessTypes.ON_CHESS_JOIN, response);
    });
};
