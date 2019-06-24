import * as express from 'express';
import {Application} from "express";
import {CreateFilm} from "../../models/films/create";
import {IFilm, IFilmToCreate} from "../../../src/reducers/Films/Films.typings";
import {IRequest, IResponse} from "../typings";

export type IcreateFilmRouterQuery = IFilmToCreate;
export type IcreateFilmRouterResponse = IFilm;

export const createFilmRouter = (async (req: IRequest, res: IResponse, _: express.NextFunction) => {
    const body = req.body as IcreateFilmRouterQuery;

    try {
        const response = await CreateFilm(body);

        res.sendResponse<IcreateFilmRouterResponse>({status: 200, message: 'Success Create Film', response});
    } catch (err) {
        res.sendResponse(err);
    }
}) as Application;
