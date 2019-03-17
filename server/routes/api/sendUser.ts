import * as express from 'express';
import {sendData} from "../../utils/SendData";
import {IRequestSession} from "../interfaces";

export const sendUserRouter = (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    sendData(res, 200, 'Load User', {user: req.user});
};
