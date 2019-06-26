import * as express from 'express';
import {IRequest, IResponse} from "../typings";
import {Application} from "express";
import {IUser} from "../../../src/reducers/User/User.typings";
import HttpError from "../../error";
import * as passport from "passport";

export interface IloginRouterQuery {
    email: string;
    password: string;
}

export type IloginRouterResponse = IUser;

export const loginRouter = ((req: IRequest, res: IResponse, next: express.NextFunction) => {
    passport.authenticate('local', function (err: HttpError, user: IUser, info: string) {
        if (err) {
            return res.sendResponse(err);
        }

        if (!user) {
            return res.sendResponse({status: 403, message: 'Not Found User'});
        }

        req.login(user, (err2: HttpError) => {
            if (err2) {
                return res.sendResponse(err2);
            }
            return  res.sendResponse<IloginRouterResponse>( {status: 200, message: 'Success Authorize', response: user});
        });
    })(req, res, next);
}) as Application;
