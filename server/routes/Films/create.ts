import * as express from 'express';
import {Application} from "express";
import Film from "../../models/Film";
import {IFilm, IFilmToCreate} from "../../../src/reducers/Films/Films.typings";
import {IRequest, IResponse} from "../typings";
import {IcreateFilmRouterQuery, IcreateFilmRouterResponse} from "./Films.typings";



export const createFilmRouter = (async (req: IRequest, res: IResponse, _: express.NextFunction) => {
    const body = req.body as IcreateFilmRouterQuery;

    try {
        const response = await Film.Create(body);

        res.sendResponse<IcreateFilmRouterResponse>({status: 200, message: 'Success Create Film', response});
    } catch (err) {
        res.sendResponse(err);
    }
}) as Application;
