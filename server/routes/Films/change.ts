import * as express from 'express';
import {Application} from "express";
import {IFilm} from "../../../src/reducers/Films/Films.typings";
import {IRequest, IResponse} from "../typings";
import Film from "../../models/Film";
import {IchangeFilmRouterQuery, IchangeFilmRouterResponse} from "./Films.typings";

export const changeFilmRouter = (async (req: IRequest, res: IResponse, _: express.NextFunction) => {
    const body = req.body as IchangeFilmRouterQuery;

    try {
        await Film.Change(body);

        res.sendResponse<IchangeFilmRouterResponse>( {status: 200, message: 'Success Change Film'});
    } catch (err) {
        res.sendResponse( err);
    }
}) as Application;
