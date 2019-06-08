import * as express from 'express';
import {Application} from 'express';
import {UserRegister} from "../../models/postgreSql/user/user";
import {sendResponse} from "../../utils/SendData";
import {checkValid} from "../../utils/validate";
import {IRequestSession} from "../typings";
import {IUser} from "../../../src/reducers/User/User.typings";

export interface IregisterRouterQuery {
    nick: string,
    email: string,
    password: string,
    password2: string
}

export type IregisterRouterResponse = IUser;

export const registerRouter = (async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    const {nick, email, password, password2} = req.body as IregisterRouterQuery;

    try {
        await checkValid({
            password,
            password_repeat: password2,
            email
        });
        const user = await UserRegister(nick, email, password);

        req.session.user = user;
        sendResponse<IregisterRouterResponse>(res, {status: 200, message: `Success Register`, response: user});
    } catch (err) {
        sendResponse(res, {status: 403, message: err.message});
    }
}) as Application;

