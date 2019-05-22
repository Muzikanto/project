import * as express from 'express';
import {sendResponse} from "../../utils/SendData";
import {IRequestSession} from "../typings";
import {Application} from "express";
import {IFilm} from "../../../src/reducers/Films/Films.typings";
import {filmReader} from "./create";

export const changeFilmRouter = (async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    const body = req.body;

    try {
        const data = (filmReader.read('films.json') || []) as IFilm[];

        for(let i = 0; i < data.length; i++) {
            if (data[i].id === body.id) {
                data[i] = body;
            }
        }

        await filmReader.write('films.json', data);

        sendResponse(res, {status: 200, message: 'Success Change Film'});
    } catch (err) {
        sendResponse(res, {status: 403, message: err.message});
    }
}) as Application;
