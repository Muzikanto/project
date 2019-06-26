import * as express from 'express';
import {IRequest, IResponse} from "../typings";
import {Application} from "express";
import {IUser} from "../../../src/reducers/User/User.typings";
import HttpError from "../../error";
import * as passport from "passport";
import {IStrategyType} from "../../lib/passport";
import {HttpStatus} from "../../lib/HttpStatus";

export interface IloginRouterQuery {
    email: string;
    password: string;
}

export type IloginRouterResponse = IUser;

export const localAuthRouter = ((req: IRequest, res: IResponse, next: express.NextFunction) => {
    passport.authenticate('local', function (err: HttpError, data: {user: IUser, strategy: IStrategyType}, info: string) {
        if (err) {
            return res.sendResponse(err);
        }

        if (!data) {
            return res.sendResponse({status: HttpStatus.NOT_FOUND, message: 'Not Found User'});
        }

        req.login(data, (err2: Error) => {
            if (err2) {
                return res.sendResponse({message: 'Error login', status: HttpStatus.INTERNAL_SERVER_ERROR});
            }

            return res.sendResponse<IloginRouterResponse>( {status: HttpStatus.OK, message: 'Success Authorize', response: data.user});
        });
    })(req, res, next);
}) as Application;
