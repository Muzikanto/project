import * as express from 'express';
import {Application} from "express";
import {IRequest, IResponse} from "../typings";
import {IFilmTypings} from "./Films.typings";
import FilmModel from "../../models/Film";

export const Change = (async (req: IRequest, res: IResponse, _: express.NextFunction) => {
    const body = req.body as IFilmTypings.ChangeQuery;

    try {
        await FilmModel.Change(body);

        res.sendResponse<IFilmTypings.ChangeResponse>( {status: 200, message: 'Success Change Film'});
    } catch (err) {
        res.sendResponse( err);
    }
}) as Application;
