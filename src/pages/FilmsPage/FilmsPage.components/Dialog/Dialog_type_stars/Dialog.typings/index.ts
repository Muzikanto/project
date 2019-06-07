import {IDialogProps} from "../../../../../../components/Dialog/Dialog.typings";
import {IactionChangeStars} from "../../../../../../reducers/Films/Films.actions";
import {IFilm} from "../../../../../../reducers/Films/Films.typings";
import { IactionDialog} from "../../../../../../reducers/Dialog/Dialog.actions";

export interface IDialogStarsProps extends IDialogProps {
    stars: number;
    film: IFilm;

    actionChangeStars: IactionChangeStars;
    actionDialog: IactionDialog;
}
