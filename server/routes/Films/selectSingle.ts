import * as express from 'express';
import {sendResponse} from "../../utils/SendData";
import {IRequestSession} from "../typings";
import {Application} from "express";
import {IFilm} from "../../../src/reducers/Films/Films.typings";
import {SelectFilm} from "../../models/postgreSql/films/select";

export interface IselectFilmRouterQuery {}

export type IselectFilmRouserResponse = IFilm;

export const selectSingleFilmRouter = (async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    try {
        const response = await SelectFilm(req.params.id);

        sendResponse<IselectFilmRouserResponse>(res, {status: 200, message: 'Success Load Films', response});
    } catch ({status, message}) {
        sendResponse(res, {status, message});
    }
}) as Application;

