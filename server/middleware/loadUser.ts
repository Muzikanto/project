import * as express from 'express';
import {UserFindById} from "../models/user/user";
import {RequestHandlerParams} from "express-serve-static-core";
import {IRequest} from "../routes/typings";

const loadUser = async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    req.user = res.locals.user = null;

    if (!req.session.user) return next();

    try {
        const user = await UserFindById(req.session.user.id);
        if (user)
            req.user = res.locals.user = {
                nick: user.nick,
                email: user.email,
                id: user.id,
            };
        next();
    } catch (err) {
        next();
    }
};

export default loadUser as RequestHandlerParams;
