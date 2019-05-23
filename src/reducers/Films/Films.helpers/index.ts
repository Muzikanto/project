import {IFilm} from "../Films.typings";

export function prepareFilms(arr: IFilm[]) {
    for (const v of arr) {
        v.is_favorite = Boolean(v.is_favorite);
        v.set_star = Boolean(v.set_star);
    }

    return arr;
}