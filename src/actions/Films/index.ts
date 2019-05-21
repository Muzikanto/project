import {Dispatch} from "redux";
import {IFilm, IFilmsOptionsFilters} from "../../reducers/Films/Films.typings";
import {getFetch, postFetch} from "../../utils/fetch";
import {IStore} from "../../reducers/typings";
import {actionDialog} from "../Dialog";

export const actionFilmsTypes = {
    FILMS_SET_FILTER: 'FILMS_SET_FILTER',
    FILMS_SET_STAR: 'FILMS_SET_STAR',
    FILMS_FIRST_LOAD: 'FILMS_FIRST_LOAD',
    FILMS_FIND: 'FILMS_FIND',
    FILMS_ADD: 'FILMS_ADD',
    FILMS_CHANGE: 'FILMS_CHANGE',
};

export type IactionFilmsFind = () => void;
export const actionFilmsFind = () => async (dispatch: Dispatch, getState: () => IStore) => {
    try {
        const {
            filter_dates,
            filter_genres,
            filter_stars,
        } = getState().FilmsReducer;

        const {response} = await getFetch('/api/films/find', {
            filter_dates,
            filter_genres,
            filter_stars
        });

        dispatch({
            data: response.arr,
            type: actionFilmsTypes.FILMS_FIND
        });
    } catch (e) {
        // Need Logic
        console.log('Error load');
    }
};

export type IactionFilmsAdd = (film: IFilm) => void;
export const actionFilmsAdd = (film: IFilm) => async (dispatch: Dispatch) => {
    try {
        const {response, status} = await postFetch('/api/films/add', film);

        if (status === 200) {
            dispatch({
                data: film,
                type: actionFilmsTypes.FILMS_ADD
            });
            actionDialog({open: false, film: null, type: null})(dispatch);
        } else {
            // Need Logic
            console.log(response)
        }
    } catch (e) {
        // Need Logic
        console.log('Error Add Film', e);
    }
};

export type IactionFilmsChange = (film: IFilm) => void;
export const actionFilmsChange = (film: IFilm) => async (dispatch: Dispatch) => {
    try {
        const {response, status} = await postFetch('/api/films/change', film);

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

interface IactionFilmsSetStarOptions {
    star: number;
    id: string;
}

export type IactionFilmsSetStar = (data: IactionFilmsSetStarOptions) => void;
export const actionFilmsSetStar = (data: IactionFilmsSetStarOptions) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actionFilmsTypes.FILMS_SET_STAR
    });
};

export type IactionFilmsSetFilter = (data: Partial<IFilmsOptionsFilters>) => void;
export const actionFilmsSetFilter = (data: Partial<IFilmsOptionsFilters>) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actionFilmsTypes.FILMS_SET_FILTER
    });
};