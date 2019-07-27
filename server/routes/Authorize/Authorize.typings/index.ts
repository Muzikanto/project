import {IUser} from "../../../../src/reducers/User/User.typings";

export namespace IAuthorizeTypings {
    export interface RegisterQuery {
        nick: string,
        email: string,
        password: string,
        password2: string
    }
    export type RegisterResponse = IUser;

    export interface LoginQuery {
        email: string;
        password: string;
    }
    export type LoginResponse = IUser;
}
