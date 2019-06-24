import * as express from 'express';
import {Application} from "express";
import {IFilm} from "../../../src/reducers/Films/Films.typings";
import {ChangeFilm} from "../../models/films/change";
import {IRequest, IResponse} from "../typings";

export type IchangeFilmRouterResponse = undefined;
export type IchangeFilmRouterQuery = IFilm;

export const changeFilmRouter = (async (req: IRequest, res: IResponse, _: express.NextFunction) => {
    const body = req.body as IchangeFilmRouterQuery;

    try {
        await ChangeFilm(body);

        res.sendResponse( {status: 200, message: 'Success Change Film'});
    } catch (err) {
        res.sendResponse( err);
    }
}) as Application;
