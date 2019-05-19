import {IFilmsFiltersOptions} from "../../../../../reducers/Films/Films.typings";
import {ISelectCheckBoxState} from "../FilterBlock.components/Select_checkBox/Select_checkBox.typings";
import {
    actionFilmsLoad,
    IactionFilmsFirstLoad, IactionFilmsLoad,
    IactionFilmsSetFilterDates,
    IactionFilmsSetFilterGenres,
    IactionFilmsSetFilterStars, IactionFilmsSetSort
} from "../../../../../actions/Films";

export interface IFilterBlockProps {
    className?: string;

    filters: IFilmsFiltersOptions;

    genresOnChange: (current: string[]) => void;
    datesOnChange: (current: string[]) => void;
    starsOnChange: (current: string) => void;
    sortOnChange: (current: string) => void;
    findOnClick: () => void;

    genres: string[];
    dates: string[];
    stars: string[];
    sort: string[];
}

export interface IFilterBlockContainerProps {
    className?: string;

    // stateToProps
    filters: IFilmsFiltersOptions;

    // dispatches
    actionFilmsSetFilterGenres: IactionFilmsSetFilterGenres;
    actionFilmsSetFilterDates: IactionFilmsSetFilterDates;
    actionFilmsSetFilterStars: IactionFilmsSetFilterStars;
    actionFilmsSetSort: IactionFilmsSetSort;
    actionFilmsFirstLoad: IactionFilmsFirstLoad;
    actionFilmsLoad: IactionFilmsLoad;
}
