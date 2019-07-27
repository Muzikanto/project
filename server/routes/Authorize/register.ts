import * as express from 'express';
import {Application} from 'express';
import UserModel from "../../models/User";
import {IRequest, IResponse} from "../typings";
import * as passport from "passport";
import {IAuthorizeTypings} from "./Authorize.typings";

export const LocalRegister = (async (req: IRequest, res: IResponse, _: express.NextFunction) => {
    const {nick, email, password, password2} = req.body as IAuthorizeTypings.RegisterQuery;

    try {
        const user = await UserModel.Create({nick, email, password});

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return res.sendResponse(err);
                }
                res.sendResponse<IAuthorizeTypings.RegisterResponse>({status: 200, message: `Success Register`, response: user});
            });
        });
    } catch (err) {
        res.sendResponse(err);
    }
}) as Application;

