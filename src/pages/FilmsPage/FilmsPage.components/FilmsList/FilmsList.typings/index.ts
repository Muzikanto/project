import {IFilm, IFilmsFilterSort} from "../../../../../reducers/Films/Films.typings";
import {IactionDialog} from "../../../../../reducers/Dialog/Dialog.actions";

export interface IFilmsListProps {
    className?: string;

    // stateToProps
    arr: IFilm[];

    onEditFilmClick: (film: IFilm) => () => void;
    onContentClick: (film: IFilm) => () => void;
    onStarClick: (film: IFilm) => () => void;
}

export interface IFilmsListContainerProps {
    className?: string;
    arr: IFilm[];
    filter_sort: IFilmsFilterSort;
    actionDialog: IactionDialog;
}
