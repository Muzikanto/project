import {IFilm, IFilmsFiltersOptions, IFilmsOptions} from "./Films.typings";
import {IReducerAction} from "../typings";
import {actionFilmsTypes} from "../../actions/Films";
import {historyPush, queryToObject} from "../../utils/historyPush";
import {IObject} from "../../utils/typings";

export function getBaseFilmsReducerState(): IFilmsOptions {
    return {
        arr: [],
        filters: {
            genres: [],
            stars: '7',
            dates: [],
            sort: 'Star'
        },
        open_filters: false,
    };
}

const initialState = getBaseFilmsReducerState();

const FilmsReducer = (state = initialState, action: IReducerAction) => {
    switch (action.type) {
        case actionFilmsTypes.FILMS_FIRST_LOAD:
            const {genres, sort, dates, stars, open_filters} = queryToObject(action.data);
            const filters: IFilmsFiltersOptions = {
                genres: genres ? genres.split(';') : state.filters.genres,
                dates: dates ? dates.split(';') : state.filters.dates,
                stars: stars || state.filters.stars,
                sort: sort || 'Star',
            };

            return {...state, filters, open_filters: open_filters === 'true'};

        case actionFilmsTypes.FILMS_LOAD:
            const hash: IObject = {};

            for (const v of state.arr) {
                hash[v.id] = true;
            }

            for (const v of action.data) {
                if (!hash[v.id]) {
                    state.arr.push(v);
                }
            }

            return {...state, arr: [...state.arr]};

        case actionFilmsTypes.FILMS_SET_STAR:
            const arr: IFilm[] = state.arr.map(el => {
                if (el.id === action.data.id) {
                    el.isLiked = true;
                    el.stars = action.data.star;
                }

                return el;
            });

            return {...state, arr};

        case actionFilmsTypes.FILMS_SET_FILTER_GENRES:
            historyPush({genres: action.data.join(';')});
            return {...state, filters: {...state.filters, genres: action.data}};

        case actionFilmsTypes.FILMS_SET_FILTER_DATES:
            historyPush({dates: action.data.join(';')});
            return {...state, filters: {...state.filters, dates: action.data}};

        case actionFilmsTypes.FILMS_SET_FILTER_STARS:
            historyPush({stars: action.data});
            return {...state, filters: {...state.filters, stars: action.data}};

        case actionFilmsTypes.FILMS_SET_SORT:
            historyPush({sort: action.data});
            return {...state, filters: {...state.filters, sort: action.data}};

        case actionFilmsTypes.FILMS_OPEN_FILTER:
            historyPush({open_filters: action.data});
            return {...state, open_filters: action.data};

        default:
            return state
    }
};

export default FilmsReducer;
