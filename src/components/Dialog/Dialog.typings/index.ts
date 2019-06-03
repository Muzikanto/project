import * as React from "react";
import {TransitionProps} from "@material-ui/core/transitions";
import {IactionDialog} from "../../../reducers/Dialog/Dialog.actions";

export interface IDialogBaseProps extends IDialogProps{
    open?: boolean
    handleClose: () => void;
}

export interface IDialogContainerProps  extends  IDialogProps{
    open?: boolean;
    actionDialog: IactionDialog;
}

export interface IDialogProps {
    transitionComponent?: React.ComponentType<TransitionProps>;
    title?: string;
}