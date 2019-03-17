import {IUserOptions} from "../UserReducer";

interface IStore {
    UserReducer: IUserOptions;
    socket: ISocketOptions;
}

export type ISocketOptions = any;

export {
    IStore
}
