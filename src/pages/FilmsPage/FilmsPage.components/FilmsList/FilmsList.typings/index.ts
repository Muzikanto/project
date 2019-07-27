import {IFilmTypings} from "../../../../../reducers/Films/Films.typings";
import {IUser} from "../../../../../reducers/User/User.typings";
import {IActionType} from "../../../../../reducers/typings";
import FilmActions from "../../../../../reducers/Films/Films.actions";
import OtherActions from "../../../../../reducers/Other/Other.actions";

export interface IFilmsListContainerProps {
    className?: string;
    type: 'grid' | 'scroll';

    arr: IFilmTypings.Item[];
    sort: IFilmTypings.Sort;
    user: IUser | null;

    SnackBarWarning: IActionType<typeof OtherActions.ShowSnackBarWarning>;
    SetFavorite: IActionType<typeof FilmActions.SetFavorite>;
    Select: IActionType<typeof FilmActions.Select>;
    DialogWithFilm: IActionType<typeof FilmActions.DialogWithFilm>;
}
