import {IUserOptions} from "../../../reducers/User/User.typings";

export type IactionSetUser = (data: IUserOptions) => void;

export type IactionDropSession = () => void;

export interface IactionAuthorizeParams {
    email: string,
    password: string
}

export type IactionAuthorize = (params: IactionAuthorizeParams) => void;

export interface IactionRegisterParams {
    nick: string,
    email: string,
    password: string,
    password2: string
}

export type IactionRegister = (params: IactionRegisterParams) => void;
