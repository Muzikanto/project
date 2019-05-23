import {IFilm, IFilmsFilterSort} from "../../../../../reducers/Films/Films.typings";
import {IactionDialog} from "../../../../../reducers/Dialog/Dialog.actions";
import {IUser} from "../../../../../reducers/User/User.typings";
import {IactionShowSnackBarWarning} from "../../../../../reducers/Other/Other.actions";
import {actionFavoriteFilm, IactionFavoriteFilm} from "../../../../../reducers/Films/Films.actions";

export interface IFilmsListProps {
    className?: string;

    // stateToProps
    arr: IFilm[];
    user: IUser | null;

    onEditFilmClick: (film: IFilm) => () => void;
    onContentClick: (film: IFilm) => () => void;
    onStarClick: (film: IFilm) => () => void;
    onFavoriteClick: (film: IFilm) => () => void;
}

export interface IFilmsListContainerProps {
    className?: string;

    arr: IFilm[];
    filter_sort: IFilmsFilterSort;
    user: IUser | null;

    actionDialog: IactionDialog;
    actionShowSnackBarWarning: IactionShowSnackBarWarning;
    actionFavoriteFilm: IactionFavoriteFilm;
}
