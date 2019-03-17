import * as express from 'express';
import {UserRegister} from "../../models/postgreSql/user";
import {sendData} from "../../utils/SendData";
// import {sendMail} from "../../../models/mail/base";
import {checkValid} from "../../utils/validate";
import {IRequestSession} from "../interfaces";
import {Application} from "express";

// const randtoken = require('rand-token');

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
        // await sendMail(email, 'auth', {email, name, id: user.id});
        sendData(res, 200, `Send to ${email}, activate email`, {user});
    } catch (err) {
        sendData(res, 403, err.message);
    }
}) as Application;

