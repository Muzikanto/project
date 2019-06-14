import {IFilm, IFilmData} from "../../../../../../reducers/Films/Films.typings";
import {IDialogProps} from "../../../../../../components/Dialog/Dialog.typings";

export interface IDialogContentProps extends IDialogProps {
    film: IFilm;
    filmData: IFilmData | null;
}
