import * as express from 'express';
import {IRequest, IResponse} from "../typings";
import {Application} from "express";
import FilmModel from "../../models/Film";
import {IFilmTypings} from "./Films.typings";

export const setFavorite = (async (req: IRequest, res: IResponse, _: express.NextFunction) => {
    const body = req.body as IFilmTypings.setFavoriteQuery;

    try {
        if (req.user) {
            await FilmModel.SetFavorite(body, req.user);

            res.sendResponse<IFilmTypings.setFavoriteResponse>( {status: 200, message: 'Success Set is_favorite'});
        } else {
            res.sendResponse( {status: 403, message: 'Need Authorize'});
        }
    } catch (err) {
        res.sendResponse(err);
    }
}) as Application;
