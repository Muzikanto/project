import {IFilm} from "../../../../../../reducers/Films/Films.typings";
import {IDialogTypeAddProps} from "../../Dialog_type_addFilm/Dialog_type_addFilm.typings";

export interface IDialogTypeChangeProps extends IDialogTypeAddProps{
    film: IFilm;
    onChange: (data: IFilm)=> void;
}
