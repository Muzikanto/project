import {IDialogProps} from "../../../../../../components/Dialog/Dialog.typings";
import FilmActions from "../../../../../../reducers/Films/Films.actions";
import {IFilmTypings} from "../../../../../../reducers/Films/Films.typings";
import {IActionType} from "../../../../../../reducers/typings";
import DialogActions from "../../../../../../reducers/Dialog/Dialog.actions";

export interface IDialogStarsProps extends IDialogProps {
    stars: number;
    film: IFilmTypings.Item;

    SetStar: IActionType<typeof FilmActions.SetStar>;
    DialogBase: IActionType<typeof DialogActions.base>;
}
