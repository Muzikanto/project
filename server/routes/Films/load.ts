import * as express from 'express';
import {sendResponse} from "../../utils/SendData";
import {IRequestSession} from "../typings";
import {Application} from "express";
import {IFilm} from "../../../src/reducers/Films/Films.typings";

export const loadFilms = (async (req: IRequestSession, res: express.Response, _: express.NextFunction) => {
    const body = req.body;
    console.log(body);

    try {
        const arr: IFilm[] = [
            {
                id: 'test',
                title: 'Avangers',
                avatar: 'М',
                date: '26 april 2019',
                url: 'https://cdnimg.rg.ru/img/content/167/02/68/kinopoisk.ru-Avengers_3A-Endgame-3193444_d_850.jpg',
                genres: ['Fantasy', 'Thriller'],
                stars: 3,
                share: 1,
                isLiked: true,
                trailer: 'gbcVZgO4n4E',
            },
            {
                id: 'test2',
                title: 'Star Wars',
                avatar: 'F',
                date: '15 november 2017',
                url: 'http://www.spletnik.ru/img/2015/12/ayna/20151208-star-post.jpg',
                genres: ['Fantasy'],
                stars: 7.5,
                share: 5,
                isLiked: false,
                trailer: 'OvyJhD5lbOw',
            }
        ];

        sendResponse(res, {status: 200, message: 'Success Authorize', response: {arr}});
    } catch (err) {
        sendResponse(res, {status: 403, message: err.message});
    }
}) as Application;
