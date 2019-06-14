import {IDialogProps} from "../../../../../../../components/Dialog/Dialog.typings";
import {IFilmToCreate} from "../../../../../../../reducers/Films/Films.typings";

export interface IDialogTypeAddProps extends IDialogProps {
    onCreate: (data: IFilmToCreate) => void;
    submitText: string;
    contentClassName?: string;

    actionDropFilm?: () => void;
}
