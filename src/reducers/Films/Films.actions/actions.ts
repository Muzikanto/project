import {FILMS_ACTIONS} from "./keys";
import {IFilmsOptions} from "../Films.typings";

export const actionFilmsSetProps = (state: Partial<IFilmsOptions>) => ({
    state,
    type: FILMS_ACTIONS.SET,
} as const);
