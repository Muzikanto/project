import {DialogProps} from "@material-ui/core/Dialog";
import {DialogContentProps} from "@material-ui/core/DialogContent";
import {IActionType} from "../../../reducers/typings";
import DialogActions from "../../../reducers/Dialog/Dialog.actions";

export interface IDialogBaseProps extends IDialogProps {
    handleClose: () => void;
}

export interface IDialogContainerProps extends IDialogProps {
    open: boolean;
    DialogBase: IActionType<typeof DialogActions.base>;
}

export interface IDialogProps {
    title?: string | React.ReactNode;

    dialogCoreProps?: Partial<DialogProps>;
    dialogContentProps?: Partial<DialogContentProps>;
    onClose?: () => void;
}