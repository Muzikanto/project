import {IFilmTypings} from "./Films.typings";
import {IReducerActionsTypes} from "../typings";
import {FILMS_ACTIONS} from "./Films.actions/keys";
import * as actions from './Films.actions/actions'

export function getBaseFilmsReducerState(): IFilmTypings.ReducerOptions {
    return {
        item: null,
        itemPart2: null,
        arr: [],
        genres: [],
        dates: [],
        stars: '4',
        sort: 'date',
        filter_open: false,
        query: '',
        id: null,
    };
}

const initialState = getBaseFilmsReducerState();

const FilmsReducer = (state = initialState, action: IReducerActionsTypes<typeof actions>): IFilmTypings.ReducerOptions => {
    switch (action.type) {
        case FILMS_ACTIONS.SET:
            return {...state, ...action.state};

        default:
            return state
    }
};

export default FilmsReducer;
