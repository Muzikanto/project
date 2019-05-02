import * as express from 'express';
import {UserRegister} from "../../models/postgreSql/user";
import {sendData} from "../../utils/SendData";
import {checkValid} from "../../utils/validate";
import {IRequestSession} from "../interfaces";
import {Application} from "express";

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
        sendData(res, 200, `Success Register`, {user});
    } catch (err) {
        console.log(err.message)
        sendData(res, 403, err.message);
    }
}) as Application;

