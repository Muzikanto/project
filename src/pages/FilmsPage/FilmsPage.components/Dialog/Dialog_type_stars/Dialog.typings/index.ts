import {IDialogProps} from "../../../../../../components/Dialog/Dialog.typings";

export interface IDialogStarsProps  extends IDialogProps{
    stars: number;
    handleChange: (stars: number) => () => void;
}
