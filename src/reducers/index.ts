import {combineReducers} from 'redux'
import {IStore} from "./typings";
import User  from "./User";
import Dialog from "./Dialog";
import Films from "./Films";
import Other from "./Other";

const Reducers = combineReducers<IStore>({
    Dialog,
    Films,
    Other,
    User,
});

export default Reducers;
