import {IFilm, IFilmFull} from "../../../../../../../reducers/Films/Films.typings";
import {IDialogTypeAddProps} from "../../Dialog_type_addFilm/Dialog_type_addFilm.typings";
import {IDialogProps} from "../../../../../../../components/Dialog/Dialog.typings";

export interface IDialogTypeChangeProps extends IDialogProps {
    submitText: string;
    onChange: (film: IFilmFull) => void;

    film: IFilm;
}
