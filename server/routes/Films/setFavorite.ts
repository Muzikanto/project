import * as express from 'express';
import {IRequest, IResponse} from "../typings";
import {Application} from "express";
import Film from "../../models/films";

export type IfavoriteFilmRouterResponse = undefined;
export type IfavoriteFilmRouterQuery = { id: string, is_favorite: boolean };

export const favoriteFilmRouter = (async (req: IRequest, res: IResponse, _: express.NextFunction) => {
    const body = req.body as IfavoriteFilmRouterQuery;

    try {
        if (req.user) {
            await Film.setFavorite(body, req.user);

            res.sendResponse( {status: 200, message: 'Success Set is_favorite'});
        } else {
            res.sendResponse( {status: 403, message: 'Need Authorize'});
        }
    } catch (err) {
        res.sendResponse(err);
    }
}) as Application;
