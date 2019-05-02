import {IReducerAction} from "../typings";
import actions from "../../actions";
import Chess from "../../features/Chess/Chess";
import {IChessOptions} from "./Chess.typings";
import socket from "../socket";

const ChessReducer = (state: IChessOptions = Chess.createChessState(), action: IReducerAction) => {
    switch (action.type) {
        case actions.CHESS_SEND:
            socket.emit(actions.CHESS_SEND, action.data);
            return action.data;
        case actions.CHESS_RESPONSE:
            return action.data;
        default:
            return state
    }
};

export default ChessReducer;
