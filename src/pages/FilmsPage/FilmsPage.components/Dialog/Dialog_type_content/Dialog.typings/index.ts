import {IFilm} from "../../../../../../reducers/Films/Films.typings";
import {IDialogProps} from "../../../../../../components/Dialog/Dialog.typings";

export interface IDialogContentProps extends IDialogProps{
    film: IFilm;
}
