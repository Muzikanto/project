import {IFilm} from "../../../../../../../reducers/Films/Films.typings";
import {IDialogProps} from "../../../../../../../components/Dialog/Dialog.typings";

export interface IDialogTypeChangeProps extends IDialogProps {
    submitText: string;
    onChange: (film: IFilm) => void;

    film: IFilm;
}
