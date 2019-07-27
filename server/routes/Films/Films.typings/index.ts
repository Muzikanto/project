import {IFilmTypings as IFilmTypingsClient} from "../../../../src/reducers/Films/Films.typings";

export namespace IFilmTypings {
    export type ChangeQuery = IFilmTypingsClient.Item;
    export type ChangeResponse = undefined;

    export type CreateQuery = IFilmTypingsClient.ItemToCreate;
    export type CreateResponse = IFilmTypingsClient.Item;

    export interface SelectQuery {
        dates?: string;
        genres?: string;
        stars?: string;
        sort?: string;
        page?: number;
        query?: string;
    }
    export type SelectResponse = IFilmTypingsClient.Item[];

    export interface SelectOneQuery {}
    export type SelectOneResponse = IFilmTypingsClient.ItemPart2;

    export type setFavoriteQuery = { id: string, is_favorite: boolean };
    export type setFavoriteResponse = undefined;

    export type setStarQuery = {id: string, stars: number};
    export type setStarResponse = undefined;
}
