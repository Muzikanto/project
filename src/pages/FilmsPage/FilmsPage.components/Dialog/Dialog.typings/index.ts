import {IDialogOptions} from "../../../../../reducers/Dialog/Dialog.typings";
import {IFilm, IFilmFull} from "../../../../../reducers/Films/Films.typings";
import {IActionType} from "../../../../../reducers/typings";
import {
    actionChangeStars,
    actionCreateFilm,
    actionFilmsChange,
    actionSelectSingleFilm
} from "../../../../../reducers/Films/Films.actions";

export interface IDialogConteinerProps {
    dialog: IDialogOptions;
    arr: IFilm[];
    film: IFilm | null;
    filmData: IFilmFull | null;

    actionChangeStars: IActionType<typeof actionChangeStars>;
    actionCreateFilm: IActionType<typeof actionCreateFilm>;
    actionFilmsChange: IActionType<typeof actionFilmsChange>;
    actionSelectSingleFilm: IActionType<typeof actionSelectSingleFilm>;
}
