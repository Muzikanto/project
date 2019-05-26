import {IFilm, IFilmsFilterSort} from "../../../../../reducers/Films/Films.typings";
import {IactionDialog} from "../../../../../reducers/Dialog/Dialog.actions";
import {IUser} from "../../../../../reducers/User/User.typings";
import {IactionShowSnackBarWarning} from "../../../../../reducers/Other/Other.actions";
import {IactionFavoriteFilm, IactionSelectFilms} from "../../../../../reducers/Films/Films.actions";

export interface IFilmsListContainerProps {
    className?: string;
    type: 'grid' | 'scroll';

    arr: IFilm[];
    filter_sort: IFilmsFilterSort;
    user: IUser | null;

    actionDialog: IactionDialog;
    actionShowSnackBarWarning: IactionShowSnackBarWarning;
    actionFavoriteFilm: IactionFavoriteFilm;
    actionSelectFilms: IactionSelectFilms;
}
