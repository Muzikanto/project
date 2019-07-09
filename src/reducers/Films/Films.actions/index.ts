import {Dispatch} from "redux";
import {
    IactionSelectFilmsOptions,
    IFilm,
    IFilmsOptions,
    IFilmsOptionsFilters,
    IFilmToCreate
} from "../Films.typings";
import {getFetch, postFetch} from "../../../src.utils/fetch";
import {IStore} from "../../typings";
import {actionDialog} from "../../Dialog/Dialog.actions";
import {
    IchangeFilmRouterQuery,
    IchangeFilmRouterResponse,
    IchangeStarsFilmRouterQuery,
    IchangeStarsFilmRouterResponse,
    IcreateFilmRouterQuery,
    IcreateFilmRouterResponse,
    IfavoriteFilmRouterQuery,
    IfavoriteFilmRouterResponse,
    IselectFilmRouserResponse,
    IselectFilmRouterQuery,
    IselectFilmsRouserResponse,
    IselectFilmsRouterQuery
} from "../../../../server/routes/Films/Films.typings";
import {actionFilmsSetProps,} from "./actions";
import {IObject, IObjectStr} from "../../../src.utils/typings";
import {historyPush, queryToObject} from "../../../src.utils/historyPush";
import {
    actionCommonShowProgressProps,
    actionShowSnackBarErrorProps,
    actionShowSnackBarSuccessProps,
    actionShowSnackBarWarningProps
} from "../../Other/Other.actions/actions";
import {actionDialogProps} from "../../Dialog/Dialog.actions/actions";

export const actionFilmsFirstLoad = (params: string) => (dispatch: Dispatch) => {
    const {
        genres,
        sort,
        dates,
        stars,
        filter_open,
        query,
        film_id,
    } = queryToObject(params);

    const payload: Partial<IFilmsOptions> = {};

    if (genres) {
        payload.genres = decodeURI(genres).split(',');
    }
    if (dates) {
        payload.dates = dates.split(',');
    }
    if (stars) {
        payload.stars = stars;
    }
    if (sort === 'star' || sort === 'date') {
        payload.sort = sort;
    }
    if (filter_open) {
        payload.filter_open = filter_open === 'true'
    }
    if (film_id) {
        dispatch(actionDialogProps({open: true, type: 'content'}));
        actionSelectSingleFilm(film_id)(dispatch);
    }

    payload.query = query ? decodeURI(query) : '';

    dispatch(actionFilmsSetProps(payload));
};

export const actionFilmsSetFilter = (data: Partial<IFilmsOptionsFilters>) => (dispatch: Dispatch) => {
    dispatch(actionFilmsSetProps(data));

    const filters: IObject = data;
    const toHistory: IObjectStr = {};
    for (const key in data) {
        toHistory[key] = Array.isArray(filters[key]) ? filters[key].join(',') : filters[key]
    }
    historyPush(toHistory);
};

export const actionSelectFilms = ({page, query, disableFilters}: IactionSelectFilmsOptions) => async (dispatch: Dispatch, getState: () => IStore) => {
    dispatch(actionCommonShowProgressProps(true));
    try {
        const {
            dates,
            genres,
            stars,
            sort,
        } = getState().FilmsReducer;
        const body = {
            dates: dates.join(','),
            genres: genres.join(','),
            stars,
            sort,
            query: query || '',
            page: page || 0,
        };

        const {response, status, message} = await getFetch<IselectFilmsRouterQuery, IselectFilmsRouserResponse>('/api/films/select', disableFilters ? {query} : body);

        if (status === 200) {
            dispatch(actionFilmsSetProps({arr: body.page ? [...getState().FilmsReducer.arr, ...response] : response}));
        } else {
            dispatch(actionShowSnackBarWarningProps(`Status: ${status}, ${message}`));
        }
    } catch (e) {
        dispatch(actionShowSnackBarErrorProps('Error actionSelectFilms'));
    }
    dispatch(actionCommonShowProgressProps(false));
};

export const actionSelectSingleFilm = (id: string) => async (dispatch: Dispatch) => {
    try {
        const {response, status, message} = await getFetch<IselectFilmRouterQuery, IselectFilmRouserResponse>('/api/films/select/' + id, {});

        if (status === 200) {
            dispatch(actionFilmsSetProps({filmData: response}));
        } else {
            dispatch(actionShowSnackBarWarningProps(`Status: ${status}, ${message}`));
        }
    } catch (e) {
        dispatch(actionShowSnackBarErrorProps('Error actionSelectSingleFilm'));
    }
};

export const actionFilmsSet = (data: Partial<IFilmsOptions>) => async (dispatch: Dispatch) => {
    dispatch(actionFilmsSetProps(data));
};

export const actionCreateFilm = (film: IFilmToCreate) => async (dispatch: Dispatch, getState: () => IStore) => {
    dispatch(actionCommonShowProgressProps(true));
    try {
        const {response, status, message} = await postFetch<IcreateFilmRouterQuery, IcreateFilmRouterResponse>('/api/films/create', film);

        if (status === 200) {
            dispatch(actionFilmsSetProps({arr: [response, ...getState().FilmsReducer.arr]}));
            dispatch(actionDialogProps({open: false}));
            dispatch(actionShowSnackBarSuccessProps(message));
        } else {
            dispatch(actionShowSnackBarWarningProps(`Status: ${status}, ${message}`));
        }
    } catch (e) {
        dispatch(actionShowSnackBarErrorProps('Error actionCreateFilm'));
    }
    dispatch(actionCommonShowProgressProps(false));
};

export const actionFilmsChange = (film: IFilm) => async (dispatch: Dispatch, getState: () => IStore) => {
    dispatch(actionCommonShowProgressProps(true));
    try {
        const {status, message} = await postFetch<IchangeFilmRouterQuery, IchangeFilmRouterResponse>('/api/films/change', film);

        if (status === 200) {
            const arr = getState().FilmsReducer.arr.map((el: IFilm) => {
                if (el.id === film.id) {
                    el = {
                        ...el,
                        ...film,
                    }
                }
                return el;
            });

            dispatch(actionFilmsSetProps({arr}));
            dispatch(actionDialogProps({open: false}));
            dispatch(actionShowSnackBarSuccessProps(message));
        } else {
            dispatch(actionShowSnackBarWarningProps(`Status: ${status}, ${message}`));
        }
    } catch (e) {
        dispatch(actionShowSnackBarErrorProps('Error actionFilmsChange'));
    }
    dispatch(actionCommonShowProgressProps(false));
};

export const actionChangeStars = (film: IchangeStarsFilmRouterQuery) => async (dispatch: Dispatch, getState: () => IStore) => {
    dispatch(actionCommonShowProgressProps(true));
    try {
        const {status, message} = await postFetch<IchangeStarsFilmRouterQuery, IchangeStarsFilmRouterResponse>('/api/films/change_star', film);

        if (status === 200) {
            const arr: IFilm[] = getState().FilmsReducer.arr.map(el => {
                if (el.id === film.id) {
                    el.set_star = true;
                    el.stars = (film.stars + el.stars) / 2;
                }

                return el;
            });
            dispatch(actionFilmsSetProps({arr}));
            actionDialog({open: false, type: null})(dispatch);
        } else {
            dispatch(actionShowSnackBarWarningProps(`Status: ${status}, ${message}`));
        }
    } catch (e) {
        dispatch(actionShowSnackBarErrorProps('Error actionChangeStars'));
    }
    dispatch(actionCommonShowProgressProps(false));
};

export const actionFavoriteFilm = (film: IfavoriteFilmRouterQuery) => async (dispatch: Dispatch, getState: () => IStore) => {
    dispatch(actionCommonShowProgressProps(true));
    try {
        const {status, message} = await postFetch<IfavoriteFilmRouterQuery, IfavoriteFilmRouterResponse>('/api/films/set_favorite', film);

        if (status === 200) {
            const arr: IFilm[] = getState().FilmsReducer.arr.map(el => {
                if (el.id === film.id) {
                    el.is_favorite = film.is_favorite;
                }

                return el;
            });

            dispatch(actionFilmsSetProps({arr}));
            actionDialog({open: false, type: null})(dispatch);
        } else {
            dispatch(actionShowSnackBarWarningProps(`Status: ${status}, ${message}`));
        }
    } catch (e) {
        dispatch(actionShowSnackBarErrorProps('Error actionChangeStars'));
    }
    dispatch(actionCommonShowProgressProps(false));
};
