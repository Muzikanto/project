import * as passport from "passport";
import {IRequest, IResponse} from "../typings";
import * as express from "express";
import {Application} from "express";
import HttpError from "../../error";

export const GoogleAuthCB = (async (req: IRequest, res: IResponse, _: express.NextFunction) => {
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/register'
    })(req, res, () => {
        req.session.save((err: HttpError) => {
            if (err) {
                return res.sendResponse(err);
            }
            res.redirect('/');
        });
    });
}) as Application;
