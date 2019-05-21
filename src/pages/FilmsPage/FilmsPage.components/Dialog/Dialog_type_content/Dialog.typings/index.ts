import {IFilm} from "../../../../../../reducers/Films/Films.typings";
import {IDialogBaseProps} from "../../Base/DialogBase.typings";

export interface IDialogProps extends IDialogBaseProps{
    film: IFilm;
}
