import * as express from 'express';
import {sendResponse} from "../../utils/SendData";
import {IRequestSession} from "../typings";
import {Application} from "express";
import JSONReader from "../../utils/Reader/_json/JSONReader";
import {IFilm} from "../../../src/reducers/Films/Films.typings";

export const filmReader = new JSONReader({pathToData: './server/resources'});

export const addFilmRouter = (async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    const body = req.body;

    try {
        const data = (filmReader.read('films.json') || []) as IFilm[];
        body.id = data.length;
        data.push(body);

        await filmReader.write('films.json', data);

        sendResponse(res, {status: 200, message: 'Success Add Film', response: body});
    } catch (err) {
        sendResponse(res, {status: 403, message: err.message});
    }
}) as Application;
