import * as express from 'express';
import {UserAuthorize} from "../../models/postgreSql/user";
import {sendResponse} from "../../utils/SendData";
import {checkValid} from "../../utils/validate";
import {IRequestSession} from "../typings";
import {Application} from "express";

export const loginRouter = (async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        await checkValid({password, email});
        const user = await UserAuthorize(email, password);

        req.session.user = user;
        sendResponse(res, {status: 200, message: 'Success Authorize', response: {user}});
    } catch (err) {
        sendResponse(res, {status: 403, message: err.message});
    }
}) as Application;
