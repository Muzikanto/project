import * as express from 'express';
import {sendResponse} from "../../utils/SendData";
import {IRequestSession} from "../typings";
import {Application} from "express";
import JSONReader from "../../utils/Reader/_json/JSONReader";
import {CreateFilm} from "../../models/postgreSql/films/create";
import {IFilm} from "../../../src/reducers/Films/Films.typings";

export const filmReader = new JSONReader({pathToData: './server/resources'});

export type IcreateFilmRouterResponse = IFilm;
export type IcreateFilmRouterQuery = IFilm;

export const createFilmRouter = (async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    const body = req.body as IcreateFilmRouterQuery;

    try {
        const response = await CreateFilm(body);

        sendResponse<IcreateFilmRouterResponse>(res, {status: 200, message: 'Success Create Film', response});
    } catch (err) {
        sendResponse(res, {status: 403, message: err.message});
    }
}) as Application;
