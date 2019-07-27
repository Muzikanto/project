import {IDialogOptions} from "../../../../../reducers/Dialog/Dialog.typings";
import {IFilmTypings} from "../../../../../reducers/Films/Films.typings";
import {IActionType} from "../../../../../reducers/typings";
import FilmActions from "../../../../../reducers/Films/Films.actions";

export interface IDialogConteinerProps {
    dialog: IDialogOptions;
    arr: IFilmTypings.Item[];
    item: IFilmTypings.Item | null;
    itemPart2: IFilmTypings.ItemPart2 | null;

    Create: IActionType<typeof FilmActions.Create>;
    Change: IActionType<typeof FilmActions.Change>;
    SelectOne: IActionType<typeof FilmActions.SelectOne>;
    DialogWithFilm: IActionType<typeof FilmActions.DialogWithFilm>;
    FilmsBase: IActionType<typeof FilmActions.base>;
}
