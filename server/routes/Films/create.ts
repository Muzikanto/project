import * as express from 'express';
import {Application} from "express";
import FilmModel from "../../models/Film";
import {IRequest, IResponse} from "../typings";
import {IFilmTypings} from "./Films.typings";

export const Create = (async (req: IRequest, res: IResponse, _: express.NextFunction) => {
    const body = req.body as IFilmTypings.CreateQuery;

    try {
        const response = await FilmModel.Create(body);

        res.sendResponse<IFilmTypings.CreateResponse>({status: 200, message: 'Success Create Film', response});
    } catch (err) {
        res.sendResponse(err);
    }
}) as Application;
