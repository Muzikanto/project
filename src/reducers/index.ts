import {combineReducers} from 'redux'
import UserReducer, {IUserOptions} from "./UserReducer";
import socket, {ISocketOptions} from "./socket";

const Reducers = combineReducers<IStore>({
    UserReducer,
    socket
});

export interface IStore {
    UserReducer: IUserOptions;
    socket: ISocketOptions;
}

export default Reducers;