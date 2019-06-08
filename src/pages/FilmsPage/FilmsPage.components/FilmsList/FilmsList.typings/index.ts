import {IFilm, IFilmsFilterSort} from "../../../../../reducers/Films/Films.typings";
import {IUser} from "../../../../../reducers/User/User.typings";
import {IActionType} from "../../../../../reducers/typings";
import {actionDialogWithFilm} from "../../../../../reducers/Dialog/Dialog.actions";
import {actionFavoriteFilm, actionSelectFilms} from "../../../../../reducers/Films/Films.actions";
import {actionShowSnackBarWarning} from "../../../../../reducers/Other/Other.actions";

export interface IFilmsListContainerProps {
    className?: string;
    type: 'grid' | 'scroll';

    arr: IFilm[];
    sort: IFilmsFilterSort;
    user: IUser | null;

    actionShowSnackBarWarning: IActionType<typeof actionShowSnackBarWarning>;
    actionFavoriteFilm: IActionType<typeof actionFavoriteFilm>;
    actionSelectFilms: IActionType<typeof actionSelectFilms>;
    actionDialogWithFilm: IActionType<typeof actionDialogWithFilm>;
}
