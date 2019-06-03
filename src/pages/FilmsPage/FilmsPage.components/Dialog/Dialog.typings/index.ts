import {IactionCreateFilm, IactionFilmsChange, IactionChangeStars} from "../../../../../reducers/Films/Films.actions";
import {IDialogOptions} from "../../../../../reducers/Dialog/Dialog.typings";
import {IFilm} from "../../../../../reducers/Films/Films.typings";
import {IactionDialog} from "../../../../../reducers/Dialog/Dialog.actions";

export interface IDialogConteinerProps {
    dialog: IDialogOptions;
    arr: IFilm[];

    actionDialog: IactionDialog;
    actionChangeStars: IactionChangeStars;
    actionCreateFilm: IactionCreateFilm;
    actionFilmsChange: IactionFilmsChange;
}
