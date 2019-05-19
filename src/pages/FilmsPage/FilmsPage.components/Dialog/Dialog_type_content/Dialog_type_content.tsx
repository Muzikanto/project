import * as React from "react";
import DialogCore from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import {IDialogProps} from "./Dialog.typings";
import {Typography} from "@material-ui/core";
import YouTube from '../../../../../components/Youtube/Youtube';

function Transition(props: any) {
    return <Slide direction="right" {...props} />;
}

class DialogTypeContent extends React.Component<IDialogProps> {
    render(): React.ReactNode {
        const {open, handleClose, film} = this.props;

        return (
            film ?
                <DialogCore
                    maxWidth={false}
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {film.title}
                    </DialogTitle>
                    <DialogContent style={{display: 'flex'}}>
                        <YouTube id={film.trailer}/>
                    </DialogContent>
                </DialogCore> : null
        )
    }
}

export default DialogTypeContent;
