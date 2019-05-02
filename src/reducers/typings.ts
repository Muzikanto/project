import {IUserOptions} from "./User/User.typings";
import {IChessOptions} from "./Chess/Chess.typings";

export interface IStore {
    User: IUserOptions;
    Chess: IChessOptions
}

export interface IReducerAction {
    type: string;
    data: any;
}
