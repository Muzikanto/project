import {IUser} from "../../../../src/reducers/User/User.typings";

export interface IregisterRouterQuery {
    nick: string,
    email: string,
    password: string,
    password2: string
}
export type IregisterRouterResponse = IUser;

export interface IloginRouterQuery {
    email: string;
    password: string;
}
export type IloginRouterResponse = IUser;