import {IactionDialog} from "../../../../../actions/Dialog";
import {IactionCreateFilm, IactionFilmsChange, IactionFilmsSetStar} from "../../../../../actions/Films";
import {IDialogOptions} from "../../../../../reducers/Dialog/Dialog.typings";
import {IFilm} from "../../../../../reducers/Films/Films.typings";

export interface IDialogConteinerProps {
    dialog: IDialogOptions;
    arr: IFilm[];

    actionDialog: IactionDialog;
    actionFilmsSetStar: IactionFilmsSetStar;
    actionCreateFilm: IactionCreateFilm;
    actionFilmsChange: IactionFilmsChange;
}
