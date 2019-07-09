import * as express from 'express';
import {Application} from 'express';
import User from "../../models/User/user";
import {IRequest, IResponse} from "../typings";
import * as passport from "passport";
import {IregisterRouterQuery, IregisterRouterResponse} from "./Authorize.typings";

export const registerRouter = (async (req: IRequest, res: IResponse, _: express.NextFunction) => {
    const {nick, email, password, password2} = req.body as IregisterRouterQuery;

    try {
        const user = await User.Create({nick, email, password});

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return res.sendResponse(err);
                }
                res.sendResponse<IregisterRouterResponse>({status: 200, message: `Success Register`, response: user});
            });
        });
    } catch (err) {
        res.sendResponse(err);
    }
}) as Application;

