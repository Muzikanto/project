import {IUserOptions} from "../User";

export interface IStore {
    UserReducer: IUserOptions;
    socket: ISocketOptions;
}

export type ISocketOptions = any;

export interface IReducerAction {
    type: string;
    data: any;
}
