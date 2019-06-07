import {IactionDialog} from "../../../reducers/Dialog/Dialog.actions";
import {DialogProps} from "@material-ui/core/Dialog";
import {DialogContentProps} from "@material-ui/core/DialogContent";

export interface IDialogBaseProps extends IDialogProps{
    handleClose: () => void;
}

export interface IDialogContainerProps  extends  IDialogProps{
    open: boolean;
    actionDialog: IactionDialog;
}

export interface IDialogProps {
    title?: string;

    dialogCoreProps?: Partial<DialogProps>;
    dialogContentProps?: Partial<DialogContentProps>;
}