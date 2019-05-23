import * as express from 'express';
import {sendResponse} from "../../utils/SendData";
import {IRequestSession} from "../typings";
import {Application} from "express";
import {ChangeFilmStars} from "../../models/postgreSql/films/changeStar";
import {FavoriteFilm} from "../../models/postgreSql/films/setFavorite";

export type IfavoriteFilmRouterResponse = undefined;
export type IfavoriteFilmRouterQuery = {id: string, is_favorite: boolean};

export const favoriteFilmRouter = (async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    const body = req.body as IfavoriteFilmRouterQuery;

    try {
        if (req.user) {
            await FavoriteFilm(body, req.user);
            sendResponse(res, {status: 200, message: 'Success Set is_favorite'});
        } else {
            sendResponse(res, {status: 403, message: 'Need Authorize'});
        }
    } catch (err) {
        sendResponse(res, {status: 403, message: err.message});
    }
}) as Application;
