import {combineReducers} from 'redux'
import User  from "./User";
import socket  from "./Socket";
import {IStore} from "./typings";


const Reducers = combineReducers<IStore>({
    UserReducer: User,
    socket
});

export default Reducers;
