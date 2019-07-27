import {IUserOptions} from "./User/User.typings";
import {IDialogOptions} from "./Dialog/Dialog.typings";
import {IFilmTypings} from "./Films/Films.typings";
import {IOtherOptions} from "./Other/Other.typings";
import {IObject} from "../src.utils/typings";

export interface IStore {
    Dialog: IDialogOptions;
    Films: IFilmTypings.ReducerOptions;
    User: IUserOptions;
    Other: IOtherOptions;
}

export interface IReducerAction {
    type: string;
    data: any;
}

export type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
export type IReducerActionsTypes<T extends IObject> = ReturnType<InferValueTypes<T>>;

type ArgumentTypes<F extends (...args: any) => any> = F extends (data: infer A) => void ? A : never;
export type IActionType<T extends (...args: any) => any> = (data: ArgumentTypes<T>) => void;