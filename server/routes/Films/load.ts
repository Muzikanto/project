import * as express from 'express';
import {sendResponse} from "../../utils/SendData";
import {IRequestSession} from "../typings";
import {Application} from "express";
import {IFilm} from "../../../src/reducers/Films/Films.typings";
import {filmReader} from "./add";

export const loadFilms = (async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    // const body = req.body;

    try {
        const arr: IFilm[] = filmReader.read('films.json');

        sendResponse(res, {status: 200, message: 'Success Load Films', response: {arr}});
    } catch (err) {
        sendResponse(res, {status: 403, message: err.message});
    }
}) as Application;
