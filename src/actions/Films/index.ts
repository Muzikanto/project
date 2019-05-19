import {Dispatch} from "redux";
import {IFilmsFiltersOptions} from "../../reducers/Films/Films.typings";
import {getFetch} from "../../utils/fetch";
import {IStore} from "../../reducers/typings";

export const actionFilmsTypes = {
    FILMS_SET_STAR: 'FILMS_SET_STAR',
    FILMS_SET_FILTER_GENRES: 'FILMS_SET_FILTER_GENRES',
    FILMS_SET_FILTER_DATES: 'FILMS_SET_FILTER_DATES',
    FILMS_SET_FILTER_STARS: 'FILMS_SET_FILTER_STARS',
    FILMS_SET_SORT: 'FILMS_SET_SORT',
    FILMS_FIRST_LOAD: 'FILMS_FIRST_LOAD',
    FILMS_LOAD: 'FILMS_LOAD',
};

export type IactionFilmsLoad = () => void;
export const actionFilmsLoad = () => async (dispatch: Dispatch, getState: () => IStore) => {
    try {
        const {response} = await getFetch('/api/films/get', getState().FilmsReducer.filters);

        dispatch({
            data: response.arr,
            type: actionFilmsTypes.FILMS_LOAD
        });
    } catch (e) {
        console.log('Error load');
    }
};

export type IactionFilmsFirstLoad = (data: string) => void;
export const actionFilmsFirstLoad = (data: string) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actionFilmsTypes.FILMS_FIRST_LOAD
    });
};

type IactionFilmsSetStarOptions = { star: number, id: string };
export type IactionFilmsSetStar = (data: IactionFilmsSetStarOptions) => void;
export const actionFilmsSetStar = (data: IactionFilmsSetStarOptions) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actionFilmsTypes.FILMS_SET_STAR
    });
};

type IactionFilmsSetFilterGenresOptions = string[];
export type IactionFilmsSetFilterGenres = (data: IactionFilmsSetFilterGenresOptions) => void;
export const actionFilmsSetFilterGenres = (data: IactionFilmsSetFilterGenresOptions) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actionFilmsTypes.FILMS_SET_FILTER_GENRES
    });
};

type IactionFilmsSetFilterDatesOptions = string[];
export type IactionFilmsSetFilterDates = (data: IactionFilmsSetFilterDatesOptions) => void;
export const actionFilmsSetFilterDates = (data: IactionFilmsSetFilterDatesOptions) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actionFilmsTypes.FILMS_SET_FILTER_DATES
    });
};

type IactionFilmsSetFilterStarsOptions = string;
export type IactionFilmsSetFilterStars = (data: IactionFilmsSetFilterStarsOptions) => void;
export const actionFilmsSetFilterStars = (data: IactionFilmsSetFilterStarsOptions) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actionFilmsTypes.FILMS_SET_FILTER_STARS
    });
};

type IactionFilmsSetSortOptions = string;
export type IactionFilmsSetSort = (data: IactionFilmsSetSortOptions) => void;
export const actionFilmsSetSort = (data: IactionFilmsSetSortOptions) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actionFilmsTypes.FILMS_SET_SORT
    });
};
