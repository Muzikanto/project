import * as express from 'express';
import {Application} from 'express';
import {UserRegister} from "../../models/postgreSql/user";
import {sendResponse} from "../../utils/SendData";
import {checkValid} from "../../utils/validate";
import {IRequestSession} from "../typings";

export const registerRouter = (async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    const {nick, email, password, password2} = req.body;

    try {
        await checkValid({
            password,
            password_repeat: password2,
            email
        });
        const user = await UserRegister(nick, email, password);

        req.session.user = user;
        sendResponse(res, {status: 200, message: `Success Register`, response: {user}});
    } catch (err) {
        sendResponse(res, {status: 403, message: err.message});
    }
}) as Application;

