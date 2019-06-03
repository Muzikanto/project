import {IFilm, IFilmsOptions} from "./Films.typings";
import {IReducerAction} from "../typings";
import {actionFilmsTypes} from "./Films.actions";
import {historyPush, queryToObject} from "../../utils/historyPush";
import {IObject, IObjectStr} from "../../utils/typings";
import {prepareFilms} from "./Films.helpers";
import {deepCopy} from "../../utils/copy";

export function getBaseFilmsReducerState(): IFilmsOptions {
    return {
        arr: [],
        filter_genres: [],
        filter_dates: [],
        filter_stars: '4',
        filter_sort: 'star',
        filter_open: false,
    };
}

const initialState = getBaseFilmsReducerState();

const FilmsReducer = (state = initialState, action: IReducerAction) => {
    switch (action.type) {
        case actionFilmsTypes.FILMS_FIRST_LOAD:
            const {
                filter_genres,
                filter_sort,
                filter_dates,
                filter_stars,
                filter_open
            } = queryToObject(action.data);

            const payload: Partial<IFilmsOptions> = {};

            if (filter_genres) {
                payload.filter_genres = decodeURI(filter_genres).split(',');
            }
            if (filter_dates) {
                payload.filter_dates = filter_dates.split(',');
            }
            if (filter_stars) {
                payload.filter_stars = filter_stars;
            }
            if (filter_sort === 'star' || filter_sort === 'date') {
                payload.filter_sort = filter_sort;
            }
            if (filter_open) {
                payload.filter_open = filter_open === 'true'
            }

            return {...state, ...payload};

        case actionFilmsTypes.FILM_CREATE:
            return {...state, arr: [action.data, ...state.arr]};

        case actionFilmsTypes.FILMS_SELECTED:
            return {
                ...state,
                arr: prepareFilms(action.data),
            };
        case actionFilmsTypes.FILMS_SELECTED_ADD:
            return {
                ...state,
                arr: [...state.arr, ...prepareFilms(action.data)],
            };

        case actionFilmsTypes.FILMS_SET_STAR:
            const arr: IFilm[] = state.arr.map(el => {
                if (el.id === action.data.id) {
                    el.set_star = true;
                    el.stars = (action.data.stars + el.stars) / 2;
                }

                return el;
            });

            return {...state, arr};

        case actionFilmsTypes.FILMS_SET_FAVORITE:
            const arr2: IFilm[] = state.arr.map(el => {
                if (el.id === action.data.id) {
                    el.is_favorite = action.data.is_favorite;
                }

                return el;
            });

            return {...state, arr: arr2};

        case actionFilmsTypes.FILMS_CHANGE:
            const arrFilms = state.arr.map((el: IObject) => {
                if (el.id === action.data.id) {
                    for (const key in action.data) {
                        el[key] = action.data[key];
                    }
                }

                return el;
            });

            return {...state, arr: arrFilms};

        case actionFilmsTypes.FILMS_SET_FILTER:
            const data: IObject = action.data;
            const toHistory: IObjectStr = {};

            for (const key in data) {
                toHistory[key] = Array.isArray(data[key]) ? data[key].join(',') : data[key]
            }

            historyPush(toHistory);

            return {...state, ...action.data};

        default:
            return state
    }
};

export default FilmsReducer;
