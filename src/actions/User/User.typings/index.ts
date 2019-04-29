import {IUserOptions} from "../../../reducers/User";

type IsetUser = (data: IUserOptions) => void;
type IdropSession = () => void;

interface IauthorizeParams {
    email: string,
    password: string
}

type Iauthorize = (params: IauthorizeParams) => void;

interface IregisterParams {
    nick: string,
    email: string,
    password: string,
    password2: string
}

type Iregister = (params: IregisterParams) => void;

export {
    IsetUser,
    Iauthorize,
    IauthorizeParams,
    Iregister,
    IregisterParams,
    IdropSession,
}
