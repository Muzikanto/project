import {IFilm, IFilmsOptions} from "./Films.typings";
import {IReducerAction} from "../typings";
import {actionFilmsTypes} from "./Films.actions";
import {historyPush, queryToObject} from "../../utils/historyPush";
import {IObject, IObjectStr} from "../../utils/typings";

export function getBaseFilmsReducerState(): IFilmsOptions {
    return {
        arr: [],
        filter_genres: [],
        filter_dates: [],
        filter_stars: '7',
        filter_sort: 'Star',
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
                payload.filter_genres = decodeURI(filter_genres).split(';');
            }
            if (filter_dates) {
                payload.filter_dates = filter_dates.split(';');
            }
            if (filter_stars) {
                payload.filter_stars = filter_stars;
            }
            if (filter_sort === 'Star' || filter_sort === 'Date') {
                payload.filter_sort = filter_sort;
            }
            if (filter_open) {
                payload.filter_open = filter_open === 'true'
            }

            return {...state, ...payload};

        case actionFilmsTypes.FILM_CREATE:
            return {...state, arr: [...state.arr, action.data]};

        case actionFilmsTypes.FILMS_SELECTED:
            return {
                ...state,
                arr: action.data.map((el: IFilm) => ({
                    ...el,
                    is_favorite: Boolean(el.is_favorite),
                    set_star: Boolean(el.set_star)
                }))
            };

        case actionFilmsTypes.FILMS_SET_STAR:
            const arr: IFilm[] = state.arr.map(el => {
                if (el.id === action.data.id) {
                    el.set_star = true;
                    el.stars = action.data.star;
                }

                return el;
            });

            return {...state, arr};

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
                toHistory[key] = Array.isArray(data[key]) ? data[key].join(';') : data[key]
            }

            historyPush(toHistory);

            return {...state, ...action.data};

        default:
            return state
    }
};

export default FilmsReducer;
