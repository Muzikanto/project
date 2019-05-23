import * as React from "react";
import DialogCore from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import {IDialogBaseProps} from "./DialogBase.typings";
import {TransitionProps} from "@material-ui/core/transitions/transition";

class DialogBase<Props  extends IDialogBaseProps> extends React.Component<Props> {
    state = {};

    render(): React.ReactNode {
        const {
            open,
            handleClose,
        } = this.props;

        return (
            <DialogCore
                maxWidth={false}
                open={Boolean(open)}
                TransitionComponent={this.getTransitionComponent}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    {this.getTitle()}
                </DialogTitle>
                <DialogContent style={{display: 'flex'}}>
                    {this.getContent()}
                </DialogContent>
            </DialogCore>
        )
    }

    protected handleChange = (name: string) => (e: any) => {
        this.setState({[name]: e.target.value})
    };

    protected getTransitionComponent(props: TransitionProps) {
        return (
            <Slide direction="right" {...props} />
        );
    }

    protected getTitle() {
        return 'Title';
    }

    protected getContent(): React.ReactNode {
        return null;
    }
}

export default DialogBase;