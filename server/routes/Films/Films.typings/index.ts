import {IFilm, IFilmData, IFilmToCreate} from "../../../../src/reducers/Films/Films.typings";

export type IchangeFilmRouterResponse = undefined;
export type IchangeFilmRouterQuery = IFilm;

export type IcreateFilmRouterQuery = IFilmToCreate;
export type IcreateFilmRouterResponse = IFilm;

export interface IselectFilmsRouterQuery {
    dates?: string;
    genres?: string;
    stars?: string;
    sort?: string;
    page?: number;
    query?: string;
}
export type IselectFilmsRouserResponse = IFilm[];

export interface IselectFilmRouterQuery {}
export type IselectFilmRouserResponse = IFilmData;

export type IfavoriteFilmRouterResponse = undefined;
export type IfavoriteFilmRouterQuery = { id: string, is_favorite: boolean };

export type IchangeStarsFilmRouterResponse = undefined;
export type IchangeStarsFilmRouterQuery = {id: string, stars: number};