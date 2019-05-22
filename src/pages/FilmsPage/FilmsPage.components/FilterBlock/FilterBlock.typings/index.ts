import {
    IactionFilmsFirstLoad, IactionSelectFilms, IactionFilmsSetFilter
} from "../../../../../actions/Films";
import {IactionDialog} from "../../../../../actions/Dialog";
import {IFilmsFilterSort, IFilmsOptionsFilters} from "../../../../../reducers/Films/Films.typings";

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
    actionFilmsSetFilter: IactionFilmsSetFilter;
    actionFilmsFirstLoad: IactionFilmsFirstLoad;
    actionSelectFilms: IactionSelectFilms;
    actionDialog: IactionDialog;
}
