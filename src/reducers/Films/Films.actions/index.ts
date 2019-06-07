import {Dispatch} from "redux";
import {IFilm, IFilmsOptionsFilters, IFilmToCreate} from "../Films.typings";
import {getFetch, postFetch} from "../../../utils/fetch";
import {IStore} from "../../typings";
import {actionDialog} from "../../Dialog/Dialog.actions";
import {IcreateFilmRouterQuery, IcreateFilmRouterResponse} from "../../../../server/routes/Films/create";
import {IselectFilmsRouserResponse, IselectFilmsRouterQuery} from "../../../../server/routes/Films/select";
import {IchangeFilmRouterQuery, IchangeFilmRouterResponse} from "../../../../server/routes/Films/change";
import {IchangeStarsFilmRouterQuery, IchangeStarsFilmRouterResponse} from "../../../../server/routes/Films/changeStars";
import {
    actionShowProgress,
    actionShowSnackBarError, actionShowSnackBarSuccess,
    actionShowSnackBarWarning
} from "../../Other/Other.actions";
import {IfavoriteFilmRouterQuery, IfavoriteFilmRouterResponse} from "../../../../server/routes/Films/favorite";

export const actionFilmsTypes = {
    FILMS_SET_FILTER: 'FILMS_SET_FILTER',
    FILMS_SET_STAR: 'FILMS_SET_STAR',
    FILMS_SET_FAVORITE: 'FILMS_SET_FAVORITE',
    FILMS_FIRST_LOAD: 'FILMS_FIRST_LOAD',
    FILMS_SELECTED: 'FILMS_SELECTED',
    FILM_CREATE: 'FILM_CREATE',
    FILMS_CHANGE: 'FILMS_CHANGE',
    FILMS_SELECTED_ADD: 'FILMS_SELECTED_ADD',
};

interface IactionSelectFilmsOptions {
    page?: number;
    input?: string;
    disableFilters?: boolean;
}

export type IactionSelectFilms = (data: IactionSelectFilmsOptions) => void;
export const actionSelectFilms = ({page, input, disableFilters}: IactionSelectFilmsOptions) => async (dispatch: Dispatch, getState: () => IStore) => {
    actionShowProgress({showProgress: true})(dispatch);
    try {
        const {
            filter_dates,
            filter_genres,
            filter_stars,
            filter_sort,
        } = getState().FilmsReducer;
        const body = {
            filter_dates: filter_dates.join(','),
            filter_genres: filter_genres.join(','),
            filter_stars,
            filter_sort,
            input: input || '',
            page: page || 0,
        };

        const {response, status, message} = await getFetch<IselectFilmsRouterQuery, IselectFilmsRouserResponse>('/api/films/select', disableFilters ? {input} : body);

        if (status === 200) {
            dispatch({
                data: response,
                type: page ? actionFilmsTypes.FILMS_SELECTED_ADD : actionFilmsTypes.FILMS_SELECTED,
            });
        } else {
            actionShowSnackBarWarning(`Status: ${status}, ${message}`)(dispatch);
        }
    } catch (e) {
        actionShowSnackBarError('Error actionSelectFilms')(dispatch);
    }
    actionShowProgress({showProgress: false})(dispatch);
};

export type IactionCreateFilm = (film: IFilmToCreate) => void;
export const actionCreateFilm = (film: IFilmToCreate) => async (dispatch: Dispatch) => {
    actionShowProgress({showProgress: true})(dispatch);
    try {
        const {response, status, message} = await postFetch<IcreateFilmRouterQuery, IcreateFilmRouterResponse>('/api/films/create', film);

        if (status === 200) {
            dispatch({
                data: response,
                type: actionFilmsTypes.FILM_CREATE
            });
            actionDialog({open: false, film: null, type: null})(dispatch);
            actionShowSnackBarSuccess(message)(dispatch);
        } else {
            actionShowSnackBarWarning(`Status: ${status}, ${message}`)(dispatch);
        }
    } catch (e) {
        actionShowSnackBarError('Error actionCreateFilm')(dispatch);
    }
    actionShowProgress({showProgress: false})(dispatch);
};

export type IactionFilmsChange = (film: IFilm) => void;
export const actionFilmsChange = (film: IFilm) => async (dispatch: Dispatch) => {
    actionShowProgress({showProgress: true})(dispatch);
    try {
        const {status, message} = await postFetch<IchangeFilmRouterQuery, IchangeFilmRouterResponse>('/api/films/change', film);

        if (status === 200) {
            dispatch({
                data: film,
                type: actionFilmsTypes.FILMS_CHANGE
            });
            actionDialog({open: false, film: null, type: null})(dispatch);
            actionShowSnackBarSuccess(message)(dispatch);
        } else {
            actionShowSnackBarWarning(`Status: ${status}, ${message}`)(dispatch);
        }
    } catch (e) {
        actionShowSnackBarError('Error actionFilmsChange')(dispatch);
    }
    actionShowProgress({showProgress: false})(dispatch);
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
    actionShowProgress({showProgress: true})(dispatch);
    try {
        const {status, message} = await postFetch<IchangeStarsFilmRouterQuery, IchangeStarsFilmRouterResponse>('/api/films/change_star', data);

        if (status === 200) {
            dispatch({
                data,
                type: actionFilmsTypes.FILMS_SET_STAR
            });
            actionDialog({open: false, film: null, type: null})(dispatch);
        } else {
            actionShowSnackBarWarning(`Status: ${status}, ${message}`)(dispatch);
        }
    } catch (e) {
        actionShowSnackBarError('Error actionChangeStars')(dispatch);
    }
    actionShowProgress({showProgress: false})(dispatch);
};

export type IactionFavoriteFilm = (data: IfavoriteFilmRouterQuery) => void;
export const actionFavoriteFilm = (data: IfavoriteFilmRouterQuery) => async (dispatch: Dispatch) => {
    actionShowProgress({showProgress: true})(dispatch);
    try {
        const {status, message} = await postFetch<IfavoriteFilmRouterQuery, IfavoriteFilmRouterResponse>('/api/films/set_favorite', data);

        if (status === 200) {
            dispatch({
                data,
                type: actionFilmsTypes.FILMS_SET_FAVORITE
            });
            actionDialog({open: false, film: null, type: null})(dispatch);
        } else {
            actionShowSnackBarWarning(`Status: ${status}, ${message}`)(dispatch);
        }
    } catch (e) {
        actionShowSnackBarError('Error actionChangeStars')(dispatch);
    }
    actionShowProgress({showProgress: false})(dispatch);
};

export type IactionFilmsSetFilter = (data: Partial<IFilmsOptionsFilters>) => void;
export const actionFilmsSetFilter = (data: Partial<IFilmsOptionsFilters>) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actionFilmsTypes.FILMS_SET_FILTER
    });
};
