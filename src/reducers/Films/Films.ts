import {IFilm, IFilmsOptions} from "./Films.typings";
import {IReducerAction} from "../typings";
import {actionFilmsTypes} from "./Films.actions";
import {historyPush, queryToObject} from "../../utils/historyPush";
import {IObject, IObjectStr} from "../../utils/typings";
import {prepareFilms} from "./Films.helpers";

export function getBaseFilmsReducerState(): IFilmsOptions {
    return {
        film: null,
        filmData: null,
        arr: [],
        genres: [],
        dates: [],
        stars: '4',
        sort: 'date',
        filter_open: false,
        query: '',
    };
}

const initialState = getBaseFilmsReducerState();

const FilmsReducer = (state = initialState, action: IReducerAction) => {
    switch (action.type) {
        case actionFilmsTypes.FILMS_FIRST_LOAD:
            const {
                genres,
                sort,
                dates,
                stars,
                filter_open,
                query,
            } = queryToObject(action.data);

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
            payload.query = query  ?decodeURI(query) : '';

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
        case actionFilmsTypes.FILM_FIELDS:
            return {...state, ...action.data};

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
