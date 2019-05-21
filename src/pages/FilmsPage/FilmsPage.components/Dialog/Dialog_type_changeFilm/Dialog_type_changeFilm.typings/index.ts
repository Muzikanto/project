import {IDialogTypeAddProps} from "../../Dialog_type_addFilm/Dialog_type_addFilm.typings";
import {IFilm} from "../../../../../../reducers/Films/Films.typings";

export interface IDialogTypeChangeProps extends IDialogTypeAddProps{
    film: IFilm;
}
