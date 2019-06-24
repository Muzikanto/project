import * as express from 'express';
import {Application} from "express";
import {IFilm} from "../../../src/reducers/Films/Films.typings";
import {SelectFilms} from "../../models/films/select";
import {IRequest, IResponse} from "../typings";

export interface IselectFilmsRouterQuery {
    dates?: string;
    genres?: string;
    stars?: string;
    sort?: string;
    page?: number;
    query?: string;
}

export type IselectFilmsRouserResponse = IFilm[];

export const selectFilmsRouter = (async (req: IRequest, res: IResponse, _: express.NextFunction) => {
    const query = req.query as IselectFilmsRouterQuery;

    try {
        const response = await SelectFilms(query, req.user);
        res.sendResponse<IselectFilmsRouserResponse>({status: 200, message: 'Success Load Films', response})
    } catch (err) {
        res.sendResponse(err);
    }
}) as Application;
