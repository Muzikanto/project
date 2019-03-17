import {combineReducers} from 'redux'
import UserReducer  from "./UserReducer";
import socket  from "./socket";
import {IStore} from "./typings";


const Reducers = combineReducers<IStore>({
    UserReducer,
    socket
});

export default Reducers;
