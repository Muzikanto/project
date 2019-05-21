import {IDialogBaseProps} from "../../Base/DialogBase.typings";

export interface IDialogProps  extends IDialogBaseProps{
    stars: number;
    handleChange: (stars: number) => () => void;
}
