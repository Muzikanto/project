import * as express from 'express';
import {sendResponse} from "../../utils/SendData";
import {IRequestSession} from "../typings";
import {Application} from "express";
import moonRequest from "./utils/moonwalkRequest";
import {IFilmData} from "../../../src/reducers/Films/Films.typings";

export interface IselectFilmRouterQuery {}
export type IselectFilmRouserResponse = IFilmData;

export const selectSingleFilmRouter = (async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    const {id} = req.params;

    try {
        const {
            kinopoisk_id,
            iframe_url,
            trailer_iframe_url,
            material_data: {
                description,
            }
        } = await moonRequest(id);
        sendResponse<IselectFilmRouserResponse>(res, {
            status: 200, message: 'Success load Film', response: {
                id: kinopoisk_id,
                description,
                iframe_film: iframe_url,
                iframe_trailer: trailer_iframe_url,
            }
        });
    } catch ({status, message}) {
        sendResponse(res, {status, message});
    }
}) as Application;
