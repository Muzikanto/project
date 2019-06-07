import * as express from 'express';
import {sendResponse} from "../../utils/SendData";
import {IRequestSession} from "../typings";
import {Application} from "express";
import {IFilmFull} from "../../../src/reducers/Films/Films.typings";
import {ChangeFilm} from "../../models/postgreSql/films/change";

export type IchangeFilmRouterResponse = undefined;
export type IchangeFilmRouterQuery = IFilmFull;

export const changeFilmRouter = (async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    const body = req.body as IchangeFilmRouterQuery;

    try {
        await ChangeFilm(body);

        sendResponse(res, {status: 200, message: 'Success Change Film'});
    } catch (err) {
        sendResponse(res, {status: 403, message: err.message});
    }
}) as Application;
