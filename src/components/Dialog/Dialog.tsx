import * as React from "react";
import DialogCore, {DialogProps} from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import {IDialogBaseProps} from "./Dialog.typings";
import {TransitionProps} from "@material-ui/core/transitions/transition";

class Dialog extends React.Component<IDialogBaseProps> {
    public render(): React.ReactNode {
        const {
            title,
            children,
            dialogContentProps,
        } = this.props;

        return (
            <DialogCore {...this.getDialogCoreProps()}>
                {
                    title && (<DialogTitle>
                        {title}
                    </DialogTitle>)
                }
                <DialogContent {...dialogContentProps}>
                    {children}
                </DialogContent>
            </DialogCore>
        )
    }

    protected getTransitionComponent(props: TransitionProps) {
        return (
            <Slide direction="right" {...props} />
        );
    }

    protected getDialogCoreProps(): Partial<DialogProps> & { open: boolean } {
        const {
            handleClose,
            dialogCoreProps,
        } = this.props;

        return {
            open: false,
            maxWidth: false,
            TransitionComponent: this.getTransitionComponent,
            keepMounted: true,
            onClose: handleClose,
            'aria-labelledby': "alert-dialog-slide-title",
            'aria-describedby': "alert-dialog-slide-description",
            ...dialogCoreProps,
        }
    }
}

export default Dialog;