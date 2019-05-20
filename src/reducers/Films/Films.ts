import {IFilm, IFilmsFiltersOptions, IFilmsOptions} from "./Films.typings";
import {IReducerAction} from "../typings";
import {actionFilmsTypes} from "../../actions/Films";
import {historyPush, queryToObject} from "../../utils/historyPush";
import {IObject} from "../../utils/typings";

const initialState: IFilmsOptions = {
    arr: [
        {
            id: 'test',
            title: 'Avangers',
            avatar: 'М',
            date: 1258338633987,
            url: 'https://cdnimg.rg.ru/img/content/167/02/68/kinopoisk.ru-Avengers_3A-Endgame-3193444_d_850.jpg',
            genres: ['Fantasy', 'Thriller'],
            stars: 3,
            share: 1,
            isLiked: true,
            trailer: 'gbcVZgO4n4E',
        },
        {
            id: 'test2',
            title: 'Star Wars',
            avatar: 'F',
            date: 1558338633987,
            url: 'http://www.spletnik.ru/img/2015/12/ayna/20151208-star-post.jpg',
            genres: ['Fantasy'],
            stars: 7.5,
            share: 5,
            isLiked: false,
            trailer: 'OvyJhD5lbOw',
        }
    ],
    filters: {
        genres: [],
        stars: '7',
        dates: [],
        sort: 'Star'
    },
    open_filters: false,
};

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

            return {...state, filters, open_filters: open_filters === 'true' };

        case actionFilmsTypes.FILMS_LOAD:
            const hash: IObject = {};

            for(const v of state.arr) {
                hash[v.id] = true;
            }

            for(const v of action.data) {
                if(!hash[v.id]) {
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
