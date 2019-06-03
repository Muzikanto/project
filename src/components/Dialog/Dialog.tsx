import * as React from "react";
import DialogCore from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import {IDialogBaseProps} from "./Dialog.typings";
import {TransitionProps} from "@material-ui/core/transitions/transition";

class Dialog extends React.Component<IDialogBaseProps> {
    render(): React.ReactNode {
        const {
            open,
            handleClose,
            title,
            children,
            transitionComponent,
        } = this.props;

        return (
            <DialogCore
                maxWidth={false}
                open={Boolean(open)}
                TransitionComponent={transitionComponent || this.getTransitionComponent}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                {
                    title && (<DialogTitle>
                        {title}
                    </DialogTitle>)
                }
                <DialogContent style={{display: 'flex'}}>
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
}

export default Dialog;