import {Dispatch} from "redux";
import {IFilmTypings as FilmTypingsClient} from "../Films.typings";
import {getFetch, postFetch} from "../../../src.utils/fetch";
import {IStore} from "../../typings";
import DialogAction from "../../Dialog/Dialog.actions";
import {IFilmTypings} from "../../../../server/routes/Films/Films.typings";
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
import {IDialogOptions} from "../../Dialog/Dialog.typings";

const SetFilter = (data: Partial<FilmTypingsClient.ReducerFiltersOptions>) => (dispatch: Dispatch) => {
    dispatch(actionFilmsSetProps(data));

    const filters: IObject = data;
    const toHistory: IObjectStr = {};
    for (const key in data) {
        toHistory[key] = Array.isArray(filters[key]) ? filters[key].join(',') : filters[key]
    }
    historyPush(toHistory);
};

const Select = ({page, query, disableFilters}: { page?: number, query?: string, disableFilters?: boolean }) => async (dispatch: Dispatch, getState: () => IStore) => {
    dispatch(actionCommonShowProgressProps(true));
    try {
        const {
            dates,
            genres,
            stars,
            sort,
        } = getState().Films;
        const body = {
            dates: dates.join(','),
            genres: genres.join(','),
            stars,
            sort,
            query: query || '',
            page: page || 0,
        };

        const {response, status, message} = await getFetch<IFilmTypings.SelectQuery, IFilmTypings.SelectResponse>('/api/films/select', disableFilters ? {query} : body);

        if (status === 200) {
            dispatch(actionFilmsSetProps({arr: body.page ? [...getState().Films.arr, ...response] : response}));
        } else {
            dispatch(actionShowSnackBarWarningProps(`Status: ${status}, ${message}`));
        }
    } catch (e) {
        dispatch(actionShowSnackBarErrorProps('Error actionSelectFilms'));
    }
    dispatch(actionCommonShowProgressProps(false));
};

const SelectOne = (id: string) => async (dispatch: Dispatch) => {
    try {
        const {response, status, message} = await getFetch<IFilmTypings.SelectOneQuery, IFilmTypings.SelectOneResponse>('/api/films/select/' + id, {});

        if (status === 200) {
            dispatch(actionFilmsSetProps({itemPart2: response}));
        } else {
            dispatch(actionShowSnackBarWarningProps(`Status: ${status}, ${message}`));
        }
    } catch (e) {
        dispatch(actionShowSnackBarErrorProps('Error actionSelectSingleFilm'));
    }
};

const base = (data: Partial<FilmTypingsClient.ReducerOptions>) => async (dispatch: Dispatch) => {
    dispatch(actionFilmsSetProps(data));
};

const Create = (film: FilmTypingsClient.ItemToCreate) => async (dispatch: Dispatch, getState: () => IStore) => {
    dispatch(actionCommonShowProgressProps(true));
    try {
        const {response, status, message} = await postFetch<IFilmTypings.CreateQuery, IFilmTypings.CreateResponse>('/api/films/create', film);

        if (status === 200) {
            dispatch(actionFilmsSetProps({arr: [response, ...getState().Films.arr]}));
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

const Change = (film: FilmTypingsClient.Item) => async (dispatch: Dispatch, getState: () => IStore) => {
    dispatch(actionCommonShowProgressProps(true));
    try {
        const {status, message} = await postFetch<IFilmTypings.ChangeQuery, IFilmTypings.ChangeResponse>('/api/films/change', film);

        if (status === 200) {
            const arr = getState().Films.arr.map((el: FilmTypingsClient.Item) => {
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

const SetStar = (film: IFilmTypings.setStarQuery) => async (dispatch: Dispatch, getState: () => IStore) => {
    dispatch(actionCommonShowProgressProps(true));
    try {
        const {status, message} = await postFetch<IFilmTypings.setStarQuery, IFilmTypings.setStarResponse>('/api/films/change_star', film);

        if (status === 200) {
            const arr: FilmTypingsClient.Item[] = getState().Films.arr.map(el => {
                if (el.id === film.id) {
                    el.set_star = true;
                    el.stars = (film.stars + el.stars) / 2;
                }

                return el;
            });
            dispatch(actionFilmsSetProps({arr}));
            DialogAction.base({open: false, type: null})(dispatch);
        } else {
            dispatch(actionShowSnackBarWarningProps(`Status: ${status}, ${message}`));
        }
    } catch (e) {
        dispatch(actionShowSnackBarErrorProps('Error actionChangeStars'));
    }
    dispatch(actionCommonShowProgressProps(false));
};

const SetFavorite = (film: IFilmTypings.setFavoriteQuery) => async (dispatch: Dispatch, getState: () => IStore) => {
    dispatch(actionCommonShowProgressProps(true));
    try {
        const {status, message} = await postFetch<IFilmTypings.setFavoriteQuery, IFilmTypings.setFavoriteResponse>('/api/films/set_favorite', film);

        if (status === 200) {
            const arr: FilmTypingsClient.Item[] = getState().Films.arr.map(el => {
                if (el.id === film.id) {
                    el.is_favorite = film.is_favorite;
                }

                return el;
            });

            dispatch(actionFilmsSetProps({arr}));
            DialogAction.base({open: false, type: null})(dispatch);
        } else {
            dispatch(actionShowSnackBarWarningProps(`Status: ${status}, ${message}`));
        }
    } catch (e) {
        dispatch(actionShowSnackBarErrorProps('Error actionChangeStars'));
    }
    dispatch(actionCommonShowProgressProps(false));
};

const DialogWithFilm = ({dialog, item, itemPart2}: { dialog: IDialogOptions, item: FilmTypingsClient.Item | null, itemPart2?: null }) => (dispatch: Dispatch) => {
    dispatch(actionDialogProps(dialog));
    dispatch(actionFilmsSetProps({item, itemPart2, id: item ? item.id : null}));

    historyPush({film_id: item ? item.id : ''});
};

const FilmAction = {
    SetStar,
    SetFavorite,
    Change,
    base,
    SelectOne,
    Select,
    Create,
    SetFilter,
    DialogWithFilm,
};

const FirstLoad = (params: string) => (dispatch: Dispatch) => {
    const {
        genres,
        sort,
        dates,
        stars,
        filter_open,
        query,
        film_id,
    } = queryToObject(params);

    const payload: Partial<FilmTypingsClient.ReducerOptions> = {};

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
        FilmAction.SelectOne(film_id)(dispatch);
    }

    payload.query = query ? decodeURI(query) : '';

    dispatch(actionFilmsSetProps(payload));
};

export default {
    ...FilmAction,
    FirstLoad,
}
