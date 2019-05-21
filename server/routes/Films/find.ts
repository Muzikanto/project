import * as express from 'express';
import {sendResponse} from "../../utils/SendData";
import {IRequestSession} from "../typings";
import {Application} from "express";
import {IFilm} from "../../../src/reducers/Films/Films.typings";
import {filmReader} from "./add";
import {IObject} from "../../../src/utils/typings";

export const findFilmsRouter = (async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    const {
        filter_dates,
        filter_genres,
        filter_stars,
    } = req.query as {
        filter_dates: string,
        filter_genres: string,
        filter_stars: string,
    };

    try {
        const arr: IFilm[] = (filmReader.read('films.json') as IFilm[])
            .filter((el: IFilm) => el.stars >= Number(filter_stars))
            .filter((el: IFilm) => {
                const arr = filter_dates.split(',');

                if (arr.length > 0 && arr[0]) {
                    for (const date of arr) {
                        if (new Date(el.date).getFullYear() === Number(date)) {
                            return true;
                        }
                    }
                    return false;
                } else {
                    return true;
                }
            })
            .filter((el: IFilm) => {
                const arr = filter_genres.split(',');

                if (arr.length > 0 && arr[0]) {
                    const hash: IObject = {};

                    for (const genre of arr) {
                        hash[genre] = true;
                    }

                    for (const genre of el.genres) {
                        if (hash[genre]) {
                            return true;
                        }
                    }

                    return false;
                } else {
                    return true;
                }
            });

        sendResponse(res, {status: 200, message: 'Success Load Films', response: {arr}});
    } catch (err) {
        sendResponse(res, {status: 403, message: err.message});
    }
}) as Application;
