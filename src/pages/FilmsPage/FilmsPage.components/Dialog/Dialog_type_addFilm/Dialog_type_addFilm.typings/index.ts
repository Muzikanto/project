import {IFilm} from "../../../../../../reducers/Films/Films.typings";

export interface IDialogProps {
    open: boolean;
    handleClose: () => void;
    onClickAdd: (data: IFilm)=> void;
}
