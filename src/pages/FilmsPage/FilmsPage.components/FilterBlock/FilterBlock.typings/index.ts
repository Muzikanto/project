import FilmActions from "../../../../../reducers/Films/Films.actions";
import {IFilmTypings} from "../../../../../reducers/Films/Films.typings";
import {IActionType} from "../../../../../reducers/typings";
import DialogAction from "../../../../../reducers/Dialog/Dialog.actions";

export interface IFilterBlockProps {
    className?: string;

    filters: IFilmTypings.ReducerFiltersOptions;

    genresOnChange: (current: string[]) => void;
    datesOnChange: (current: string[]) => void;
    starsOnChange: (current: string) => void;
    sortOnChange: (current: IFilmTypings.Sort) => void;
    findOnClick: () => void;
    addOnClick: () => void;
    onExpandFilters: () => void;
    onInputFind: (value: string) => void;

    genres: string[];
    dates: string[];
    stars: string[];
    sort: IFilmTypings.Sort[];
}

export interface IFilterBlockContainerProps {
    className?: string;

    // stateToProps
    filters: IFilmTypings.ReducerFiltersOptions;

    // dispatches
    SetFilter: IActionType<typeof FilmActions.SetFilter>;
    FirstLoad: IActionType<typeof FilmActions.FirstLoad>;
    Select: IActionType<typeof FilmActions.Select>;
    DialogBase: IActionType<typeof DialogAction.base>;
}
