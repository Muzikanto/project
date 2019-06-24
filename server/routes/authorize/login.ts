import * as express from 'express';
import {UserAuthorize} from "../../models/user/user";
import {IRequest, IResponse} from "../typings";
import {Application} from "express";
import {IUser} from "../../../src/reducers/User/User.typings";
import {IregisterRouterResponse} from "./register";

export interface IloginRouterQuery {
    email: string;
    password: string;
}

export type IloginRouterResponse = IUser;

export const loginRouter = (async (req: IRequest, res: IResponse, _: express.NextFunction) => {
    const {password, email} = req.body as IloginRouterQuery;

    try {
        const user = await UserAuthorize(email, password);

        req.session.user = user;
        res.sendResponse<IregisterRouterResponse>( {status: 200, message: 'Success Authorize', response: user});
    } catch (err) {
        res.sendResponse(err);
    }
}) as Application;
