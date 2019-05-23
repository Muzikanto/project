import * as express from 'express';
import {sendResponse} from "../../utils/SendData";
import {IRequestSession} from "../typings";
import {Application} from "express";
import {ChangeFilmStars} from "../../models/postgreSql/films/changeStar";

export type IchangeStarsFilmRouterResponse = undefined;
export type IchangeStarsFilmRouterQuery = {id: string, stars: number};

export const changeFilmStarsRouter = (async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    const body = req.body as IchangeStarsFilmRouterQuery;

    try {
        if (req.user) {
            await ChangeFilmStars(body, req.user);
            sendResponse(res, {status: 200, message: 'Success Change Film Stars'});
        } else {
            sendResponse(res, {status: 403, message: 'Need Authorize'});
        }
    } catch (err) {
        sendResponse(res, {status: 403, message: err.message});
    }
}) as Application;
