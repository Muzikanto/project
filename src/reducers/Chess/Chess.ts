import {IReducerAction} from "../typings";
import actions from "../../actions";
import Chess from "../../features/Chess/Chess";
import {IChessOptions} from "./Chess.typings";
import socket from "../socket";

const initialState: IChessOptions = {
    state: Chess.createChessState(false),
    room: '',
    users: {},
};

const ChessReducer = (state = initialState, action: IReducerAction) => {
    switch (action.type) {
        case actions.CHESS_SEND:
            socket.emit(actions.CHESS_SEND, {state: action.data, room: state.room});

            return {...state, state: {...state.state, ...action.data}};
        case actions.ON_CHESS_RESPONSE:
            return {...state, state: {...state.state, ...action.data}};
        case actions.CHESS_START:
            socket.emit(actions.CHESS_START, state);

            return state;
        case actions.ON_CHESS_START:
            console.log(action.data.state.player);
            return action.data;
        case actions.CHESS_JOIN:
            socket.emit(actions.CHESS_JOIN, action.data);

            return state;
        case actions.ON_CHESS_JOIN:
            const {nick, room} = action.data;

            const users = {...state.users};
            users[nick] = nick;

            return {...state, users, room};
        case actions.ON_CHESS_ERROR:
            alert(action.data);

            return state;
        default:
            return state
    }
};

export default ChessReducer;
