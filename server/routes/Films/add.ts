import * as express from 'express';
import {sendResponse} from "../../utils/SendData";
import {IRequestSession} from "../typings";
import {Application} from "express";
import {IFilm} from "../../../src/reducers/Films/Films.typings";

export const addFilmRouter = (async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    const body = req.body;
    body.id = 'newId';

    try {
        sendResponse(res, {status: 200, message: 'Success Add Film', response: body});
    } catch (err) {
        sendResponse(res, {status: 403, message: err.message});
    }
}) as Application;
