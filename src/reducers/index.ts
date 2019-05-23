import {combineReducers} from 'redux'
import {IStore} from "./typings";
import User  from "./User/User";
import Chess from "./Chess/Chess";
import DialogReducer from "./Dialog/Dialog";
import FilmsReducer from "./Films/Films";
import OtherReducer from "./Other/Other";

const Reducers = combineReducers<IStore>({
    DialogReducer,
    FilmsReducer,
    Chess,
    User,
    OtherReducer
});

export default Reducers;
