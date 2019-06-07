import {
    IactionCreateFilm,
    IactionFilmsChange,
    IactionChangeStars,
     IactionSelectSingleFilm, IactionFilmSetField
} from "../../../../../reducers/Films/Films.actions";
import {IDialogOptions} from "../../../../../reducers/Dialog/Dialog.typings";
import {IFilm, IFilmFull} from "../../../../../reducers/Films/Films.typings";

export interface IDialogConteinerProps {
    dialog: IDialogOptions;
    arr: IFilm[];
    film: IFilm | null;
    filmData: IFilmFull | null;

    actionChangeStars: IactionChangeStars;
    actionCreateFilm: IactionCreateFilm;
    actionFilmsChange: IactionFilmsChange;
    actionSelectSingleFilm: IactionSelectSingleFilm;
    actionFilmSetField: IactionFilmSetField;
}
