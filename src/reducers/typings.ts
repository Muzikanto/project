import {IUserOptions} from "./User/User.typings";
import {IChessOptions} from "./Chess/Chess.typings";
import {IDialogOptions} from "./Dialog/Dialog-Favorites/Dialog-Favorites.typings";
import {IFilmsOptions} from "./Films/Films.typings";

export interface IStore {
    DialogReducer: IDialogOptions;
    FilmsReducer: IFilmsOptions;
    User: IUserOptions;
    Chess: IChessOptions
}

export interface IReducerAction {
    type: string;
    data: any;
}
