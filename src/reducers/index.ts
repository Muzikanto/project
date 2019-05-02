import {combineReducers} from 'redux'
import {IStore} from "./typings";
import User  from "./User/User";
import Chess from "./Chess/Chess";

const Reducers = combineReducers<IStore>({
    Chess,
    User
});

export default Reducers;
