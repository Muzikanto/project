import {IDialogProps} from "../../../../../../../components/Dialog/Dialog.typings";
import {IFilmTypings} from "../../../../../../../reducers/Films/Films.typings";

export interface IDialogTypeAddProps extends IDialogProps {
    onCreate: (data: IFilmTypings.ItemToCreate) => void;
    submitText: string;
    contentClassName?: string;

    actionDropFilm?: () => void;
}
