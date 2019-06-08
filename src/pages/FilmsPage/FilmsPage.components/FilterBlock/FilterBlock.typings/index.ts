import {
    actionFilmsFirstLoad,
    actionFilmsSetFilter, actionSelectFilms,
} from "../../../../../reducers/Films/Films.actions";
import {IFilmsFilterSort, IFilmsOptionsFilters} from "../../../../../reducers/Films/Films.typings";
import {IActionType} from "../../../../../reducers/typings";
import {actionDialog} from "../../../../../reducers/Dialog/Dialog.actions";

export interface IFilterBlockProps {
    className?: string;

    filters: IFilmsOptionsFilters;

    genresOnChange: (current: string[]) => void;
    datesOnChange: (current: string[]) => void;
    starsOnChange: (current: string) => void;
    sortOnChange: (current: IFilmsFilterSort) => void;
    findOnClick: () => void;
    addOnClick: () => void;
    onExpandFilters: () => void;
    onInputFind: (value: string) => void;

    genres: string[];
    dates: string[];
    stars: string[];
    sort: IFilmsFilterSort[];
}

export interface IFilterBlockContainerProps {
    className?: string;

    // stateToProps
    filters: IFilmsOptionsFilters;

    // dispatches
    actionFilmsSetFilter: IActionType<typeof actionFilmsSetFilter>;
    actionFilmsFirstLoad: IActionType<typeof actionFilmsFirstLoad>;
    actionSelectFilms: IActionType<typeof actionSelectFilms>;
    actionDialog: IActionType<typeof actionDialog>;
}
