import {IDialogBaseProps} from "../../Base/DialogBase.typings";
import {IFilmToCreate} from "../../../../../../reducers/Films/Films.typings";

export interface IDialogTypeAddProps extends IDialogBaseProps{
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
