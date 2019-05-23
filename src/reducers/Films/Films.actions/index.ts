import {Dispatch} from "redux";
import {IFilm, IFilmsOptionsFilters} from "../Films.typings";
import {getFetch, postFetch} from "../../../utils/fetch";
import {IStore} from "../../typings";
import {actionDialog} from "../../Dialog/Dialog.actions";
import {IcreateFilmRouterQuery, IcreateFilmRouterResponse} from "../../../../server/routes/Films/create";
import {IselectFilmsRouserResponse, IselectFilmsRouterQuery} from "../../../../server/routes/Films/select";
import {IchangeFilmRouterQuery, IchangeFilmRouterResponse} from "../../../../server/routes/Films/change";
import {IchangeStarsFilmRouterQuery, IchangeStarsFilmRouterResponse} from "../../../../server/routes/Films/changeStars";

export const actionFilmsTypes = {
    FILMS_SET_FILTER: 'FILMS_SET_FILTER',
    FILMS_SET_STAR: 'FILMS_SET_STAR',
    FILMS_FIRST_LOAD: 'FILMS_FIRST_LOAD',
    FILMS_SELECTED: 'FILMS_SELECTED',
    FILM_CREATE: 'FILM_CREATE',
    FILMS_CHANGE: 'FILMS_CHANGE',
};

export type IactionSelectFilms = () => void;
export const actionSelectFilms = () => async (dispatch: Dispatch, getState: () => IStore) => {
    try {
        const {
            filter_dates,
            filter_genres,
            filter_stars,
        } = getState().FilmsReducer;

        const {response, status} = await getFetch<IselectFilmsRouterQuery, IselectFilmsRouserResponse>('/api/films/select', {
            filter_dates: filter_dates.join(','),
            filter_genres: filter_genres.join(','),
            filter_stars
        });

        if (status === 200) {
            dispatch({
                data: response,
                type: actionFilmsTypes.FILMS_SELECTED,
            });
        } else {
            // Need Logic
            console.log('Error load no 200');
        }
    } catch (e) {
        // Need Logic
        console.log('Error load');
    }
};

export type IactionCreateFilm = (film: IFilm) => void;
export const actionCreateFilm = (film: IFilm) => async (dispatch: Dispatch) => {
    try {
        const {response, status} = await postFetch<IcreateFilmRouterQuery, IcreateFilmRouterResponse>('/api/films/create', film);

        if (status === 200) {
            dispatch({
                data: response,
                type: actionFilmsTypes.FILM_CREATE
            });
            actionDialog({open: false, film: null, type: null})(dispatch);
        } else {
            // Need Logic
            console.log(status, response)
        }
    } catch (e) {
        // Need Logic
        console.log('Error Add Film', e);
    }
};

export type IactionFilmsChange = (film: IFilm) => void;
export const actionFilmsChange = (film: IFilm) => async (dispatch: Dispatch) => {
    try {
        const {response, status} = await postFetch<IchangeFilmRouterQuery, IchangeFilmRouterResponse>('/api/films/change', film);

        if (status === 200) {
            dispatch({
                data: film,
                type: actionFilmsTypes.FILMS_CHANGE
            });
            actionDialog({open: false, film: null, type: null})(dispatch);
        } else {
            // Need Logic
            console.log(response)
        }
    } catch (e) {
        // Need Logic
        console.log('Error Change Film', e);
    }
};

export type IactionFilmsFirstLoad = (data: string) => void;
export const actionFilmsFirstLoad = (data: string) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actionFilmsTypes.FILMS_FIRST_LOAD
    });
};

export type IactionChangeStars = (data: IchangeStarsFilmRouterQuery) => void;
export const actionChangeStars = (data: IchangeStarsFilmRouterQuery) => async (dispatch: Dispatch) => {
    try {
        const {response, status} = await postFetch<IchangeStarsFilmRouterQuery, IchangeStarsFilmRouterResponse>('/api/films/change_star', data);

        if (status === 200) {
            dispatch({
                data,
                type: actionFilmsTypes.FILMS_SET_STAR
            });
            actionDialog({open: false, film: null, type: null})(dispatch);
        } else {
            // Need Logic
            console.log(response)
        }
    } catch (e) {
        // Need Logic
        console.log('Error Change Film', e);
    }
};

export type IactionFilmsSetFilter = (data: Partial<IFilmsOptionsFilters>) => void;
export const actionFilmsSetFilter = (data: Partial<IFilmsOptionsFilters>) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actionFilmsTypes.FILMS_SET_FILTER
    });
};
