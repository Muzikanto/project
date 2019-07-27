import * as express from 'express';
import {Application} from "express";
import FilmModel from "../../models/Film";
import {IRequest, IResponse} from "../typings";
import {IFilmTypings} from "./Films.typings";

export const Select = (async (req: IRequest, res: IResponse, _: express.NextFunction) => {
    const query = req.query as IFilmTypings.SelectQuery;

    try {
        const response = await FilmModel.Select(query, req.user);
        res.sendResponse<IFilmTypings.SelectResponse>({status: 200, message: 'Success Load Films', response})
    } catch (err) {
        res.sendResponse(err);
    }
}) as Application;
