import * as express from 'express';
import {UserAuthorize} from "../../../models/postgreSql/user";
import {sendData} from "../../../utils/SendData";
import {checkValid} from "../../../utils/validate";
import {IRequestSession} from "../../interfaces";

export const loginRouter = async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        await checkValid({password, email});
        const user = await UserAuthorize(email, password);

        req.session.user = user;
        sendData(res, 200, 'Success Authorize', {user});
    } catch (err) {
        sendData(res, 403, err.message);
    }
};
