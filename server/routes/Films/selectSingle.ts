import * as express from 'express';
import {Application} from "express";
import moonRequest from "./Films.utils/moonwalkRequest";
import {IFilmData} from "../../../src/reducers/Films/Films.typings";
import {IRequest, IResponse} from "../typings";

export interface IselectFilmRouterQuery {}

export type IselectFilmRouserResponse = IFilmData;

export const selectSingleFilmRouter = (async (req: IRequest, res: IResponse, _: express.NextFunction) => {
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

        res.sendResponse<IselectFilmRouserResponse>({
            status: 200,
            message: 'Success load Film',
            response: {
                id: kinopoisk_id,
                description,
                iframe_film: iframe_url,
                iframe_trailer: trailer_iframe_url,
            }
        });
    } catch (err) {
        res.sendResponse(err);
    }
}) as Application;
