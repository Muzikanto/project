import {FILMS_ACTIONS} from "./keys";
import {IFilmTypings} from "../Films.typings";

export const actionFilmsSetProps = (state: Partial<IFilmTypings.ReducerOptions>) => ({
    state,
    type: FILMS_ACTIONS.SET,
} as const);
