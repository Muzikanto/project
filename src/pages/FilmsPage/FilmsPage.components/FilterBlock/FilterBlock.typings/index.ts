import {IFilmsFiltersOptions} from "../../../../../reducers/Films/Films.typings";
import {
    IactionFilmsFirstLoad, IactionFilmsLoad, IactionFilmsOpenFilter,
    IactionFilmsSetFilterDates,
    IactionFilmsSetFilterGenres,
    IactionFilmsSetFilterStars, IactionFilmsSetSort
} from "../../../../../actions/Films";
import {IactionDialogOpen} from "../../../../../actions/Dialog";

export interface IFilterBlockProps {
    className?: string;

    filters: IFilmsFiltersOptions;
    open_filters: boolean

    genresOnChange: (current: string[]) => void;
    datesOnChange: (current: string[]) => void;
    starsOnChange: (current: string) => void;
    sortOnChange: (current: string) => void;
    findOnClick: () => void;
    addOnClick: () => void;
    onExpandFilters: () => void;

    genres: string[];
    dates: string[];
    stars: string[];
    sort: string[];
}

export interface IFilterBlockContainerProps {
    className?: string;

    // stateToProps
    filters: IFilmsFiltersOptions;
    open_filters: boolean;

    // dispatches
    actionFilmsSetFilterGenres: IactionFilmsSetFilterGenres;
    actionFilmsSetFilterDates: IactionFilmsSetFilterDates;
    actionFilmsSetFilterStars: IactionFilmsSetFilterStars;
    actionFilmsSetSort: IactionFilmsSetSort;
    actionFilmsFirstLoad: IactionFilmsFirstLoad;
    actionFilmsLoad: IactionFilmsLoad;
    actionDialogOpen: IactionDialogOpen;
    actionFilmsOpenFilter: IactionFilmsOpenFilter;
}
