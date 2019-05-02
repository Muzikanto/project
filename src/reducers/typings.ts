import {IUserOptions} from "./User/User.typings";
import {IChessState} from "../features/Chess/Chess.typings";

export interface IStore {
    User: IUserOptions;
    Chess: IChessState
}

export interface IReducerAction {
    type: string;
    data: any;
}
