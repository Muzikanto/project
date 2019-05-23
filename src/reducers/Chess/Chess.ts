import {IReducerAction} from "../typings";
import Chess from "../../pages/ChessPage/ChessPage.components/Chess/Chess";
import {IChessOptions} from "./Chess.typings";
import socket from "../socket";
import {actionsChessTypes} from "./Chess.actions";

const initialState: IChessOptions = {
    state: Chess.createChessState(false),
    room: '',
    users: {},
};

const ChessReducer = (state = initialState, action: IReducerAction) => {
    switch (action.type) {
        case actionsChessTypes.CHESS_SEND:
            socket.emit(actionsChessTypes.CHESS_SEND, {state: action.data, room: state.room});

            return {...state, state: {...state.state, ...action.data}};
        case actionsChessTypes.ON_CHESS_RESPONSE:
            return {...state, state: {...state.state, ...action.data}};
        case actionsChessTypes.CHESS_START:
            socket.emit(actionsChessTypes.CHESS_START, state);

            return state;
        case actionsChessTypes.ON_CHESS_START:
            console.log(action.data.state.player);
            return action.data;
        case actionsChessTypes.CHESS_JOIN:
            socket.emit(actionsChessTypes.CHESS_JOIN, action.data);

            return state;
        case actionsChessTypes.ON_CHESS_JOIN:
            const {nick, room} = action.data;

            const users = {...state.users};
            users[nick] = nick;

            return {...state, users, room};
        case actionsChessTypes.ON_CHESS_ERROR:
            alert(action.data);

            return state;
        default:
            return state
    }
};

export default ChessReducer;
