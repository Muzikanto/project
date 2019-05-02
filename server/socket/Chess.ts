import actions from "../../src/actions";
import {IChessState} from "../../src/features/Chess/Chess.typings";
import * as SocketIO from "socket.io";

export const SocketChessHod = (_: SocketIO.Server, socket: SocketIO.Socket) => async (data: IChessState) => {
    socket.broadcast.emit(actions.CHESS_RESPONSE, data)
};
