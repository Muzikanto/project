import * as express from 'express';
import {Application} from "express";
import {IFilm} from "../../../src/reducers/Films/Films.typings";
import Film from "../../models/Film";
import {IRequest, IResponse} from "../typings";
import {IselectFilmsRouserResponse, IselectFilmsRouterQuery} from "./Films.typings";



export const selectFilmsRouter = (async (req: IRequest, res: IResponse, _: express.NextFunction) => {
    const query = req.query as IselectFilmsRouterQuery;

    try {
        const response = await Film.Select(query, req.user);
        res.sendResponse<IselectFilmsRouserResponse>({status: 200, message: 'Success Load Films', response})
    } catch (err) {
        res.sendResponse(err);
    }
}) as Application;
