import {IFilm} from "../../../../../../reducers/Films/Films.typings";
import {IDialogBaseProps} from "../../Base/DialogBase.typings";

export interface IDialogTypeAddProps extends IDialogBaseProps{
    onClickAdd: (data: IFilm)=> void;
    contentClassName?: string;
}

export interface IDialogTypeAddState {
    name: string;
    date: Date;
    genres: string[];
    image_src: string;
    trailerId: string;
}
