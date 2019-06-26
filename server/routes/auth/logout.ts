import * as express from 'express';
import {Application} from "express";
import {IRequest, IResponse} from "../typings";

export const logoutRouter = ((req: IRequest, res: IResponse, _: express.NextFunction) => {
    req.logout();
    req.session.destroy((err: Error) => {
        if (err) {
            return res.sendResponse({status: 500, message: "Error Destroy Session"});
        }
        res.sendResponse({status: 200, message: "Success Destroy"});
    });
}) as Application;
