import * as express from 'express';
import {UserAuthorize} from "../../models/postgreSql/user/user";
import {sendResponse} from "../../utils/SendData";
import {checkValid} from "../../utils/validate";
import {IRequestSession} from "../typings";
import {Application} from "express";
import {IUser} from "../../../src/reducers/User/User.typings";
import {IregisterRouterResponse} from "./register";

export interface IloginRouterQuery {
    email: string;
    password: string;
}

export type IloginRouterResponse = IUser;

export const loginRouter = (async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    const {password, email} = req.body as IloginRouterQuery;

    try {
        await checkValid({password, email});
        const user = await UserAuthorize(email, password);

        req.session.user = user;
        sendResponse<IregisterRouterResponse>(res, {status: 200, message: 'Success Authorize', response: user});
    } catch (err) {
        sendResponse(res, {status: 403, message: err.message});
    }
}) as Application;
