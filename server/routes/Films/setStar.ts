import * as express from 'express';
import {IRequest, IResponse} from "../typings";
import {Application} from "express";
import FilmModel from "../../models/Film";
import {IFilmTypings} from "./Films.typings";

export const setStar = (async (req: IRequest, res: IResponse, _: express.NextFunction) => {
    const body = req.body as IFilmTypings.setStarQuery;

    try {
        if (req.user) {
            await FilmModel.SetStar(body, req.user);
            res.sendResponse<IFilmTypings.setStarResponse>( {status: 200, message: 'Success Change Film Stars'});
        } else {
            res.sendResponse( {status: 403, message: 'Need Authorize'});
        }
    } catch (err) {
        res.sendResponse(err);
    }
}) as Application;
