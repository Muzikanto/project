import * as express from 'express';
import {sendData} from "../../utils/SendData";
import {IRequestSession} from "../interfaces";
import {Application} from "express";


export const logoutRouter = ((req: IRequestSession, res: express.Response, next: express.NextFunction) => {
    req.session.destroy((err: Error) => {
        if (err) return next(err);
        sendData(res, 200,  "Success Destroy");
    });
}) as Application;
