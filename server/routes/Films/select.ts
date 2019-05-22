import * as express from 'express';
import {sendResponse} from "../../utils/SendData";
import {IRequestSession} from "../typings";
import {Application} from "express";
import {IFilm} from "../../../src/reducers/Films/Films.typings";
import {SelectFilms} from "../../models/postgreSql/films/select";

export interface IselectFilmsRouterQuery {
    filter_dates: string;
    filter_genres: string;
    filter_stars: string;
}

export type IselectFilmsRouserResponse = IFilm[];

export const selectFilmsRouter = (async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    const query = req.query as IselectFilmsRouterQuery;

    try {
        const response = await SelectFilms(query);

        sendResponse<IselectFilmsRouserResponse>(res, {status: 200, message: 'Success Load Films', response});
    } catch (err) {
        sendResponse(res, {status: 403, message: err.message});
    }
}) as Application;
