import {IDialogProps} from "../../../../../../components/Dialog/Dialog.typings";
import {actionChangeStars} from "../../../../../../reducers/Films/Films.actions";
import {IFilm} from "../../../../../../reducers/Films/Films.typings";
import {IActionType} from "../../../../../../reducers/typings";
import {actionDialog} from "../../../../../../reducers/Dialog/Dialog.actions";

export interface IDialogStarsProps extends IDialogProps {
    stars: number;
    film: IFilm;

    actionChangeStars: IActionType<typeof actionChangeStars>;
    actionDialog: IActionType<typeof actionDialog>;
}
