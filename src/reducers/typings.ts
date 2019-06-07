import {IUserOptions} from "./User/User.typings";
import {IChessOptions} from "./Chess/Chess.typings";
import {IDialogOptions} from "./Dialog/Dialog.typings";
import {IFilmsOptions} from "./Films/Films.typings";
import {IOtherOptions} from "./Other/Other.typings";

export interface IStore {
    DialogReducer: IDialogOptions;
    FilmsReducer: IFilmsOptions;
    User: IUserOptions;
    Chess: IChessOptions
    OtherReducer: IOtherOptions;
}

export interface IReducerAction {
    type: string;
    data: any;
}
