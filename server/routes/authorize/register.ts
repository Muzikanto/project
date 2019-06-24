import * as express from 'express';
import {Application} from 'express';
import {UserRegister} from "../../models/user/user";
import {IUser} from "../../../src/reducers/User/User.typings";
import {IRequest, IResponse} from "../typings";

export interface IregisterRouterQuery {
    nick: string,
    email: string,
    password: string,
    password2: string
}

export type IregisterRouterResponse = IUser;

export const registerRouter = (async (req: IRequest, res: IResponse, _: express.NextFunction) => {
    const {nick, email, password, password2} = req.body as IregisterRouterQuery;

    try {
        const user = await UserRegister(nick, email, password);

        req.session.user = user;
        res.sendResponse<IregisterRouterResponse>( {status: 200, message: `Success Register`, response: user});
    } catch (err) {
        res.sendResponse( err);
    }
}) as Application;

