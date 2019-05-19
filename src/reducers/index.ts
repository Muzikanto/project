import {combineReducers} from 'redux'
import {IStore} from "./typings";
import User  from "./User/User";
import Chess from "./Chess/Chess";
import DialogReducer from "./Dialog/Dialog";
import FilmsReducer from "./Films/Films";

const Reducers = combineReducers<IStore>({
    DialogReducer,
    FilmsReducer,
    Chess,
    User
});

export default Reducers;
