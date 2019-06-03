import {IFilmToCreate} from "../../../../../../reducers/Films/Films.typings";
import {IDialogProps} from "../../../../../../components/Dialog/Dialog.typings";

export interface IDialogTypeAddProps extends IDialogProps{
    onCreate: (data: IFilmToCreate)=> void;
    submitText: string;
    contentClassName?: string;
}

export interface IDialogTypeAddState {
    name: string;
    date: Date;
    genres: string[];
    image_src: string;
    trailer_id: string;
}
