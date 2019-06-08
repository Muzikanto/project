import {IFilmsOptions} from "./Films.typings";
import {IReducerActionsTypes} from "../typings";
import {FILMS_ACTIONS} from "./Films.actions/keys";
import * as actions from './Films.actions/actions'

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

const FilmsReducer = (state = initialState, action: IReducerActionsTypes<typeof actions>): IFilmsOptions => {
    switch (action.type) {
        case FILMS_ACTIONS.SET:
            return {...state, ...action.state};

        default:
            return state
    }
};

export default FilmsReducer;
