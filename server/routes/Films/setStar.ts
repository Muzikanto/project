import * as express from 'express';
import {IRequest, IResponse} from "../typings";
import {Application} from "express";
import Film from "../../models/films";

export type IchangeStarsFilmRouterResponse = undefined;
export type IchangeStarsFilmRouterQuery = {id: string, stars: number};

export const changeFilmStarsRouter = (async (req: IRequest, res: IResponse, _: express.NextFunction) => {
    const body = req.body as IchangeStarsFilmRouterQuery;

    try {
        if (req.user) {
            await Film.setStar(body, req.user);
            res.sendResponse<IchangeStarsFilmRouterResponse>( {status: 200, message: 'Success Change Film Stars'});
        } else {
            res.sendResponse<IchangeStarsFilmRouterResponse>( {status: 403, message: 'Need Authorize'});
        }
    } catch (err) {
        res.sendResponse(err);
    }
}) as Application;
