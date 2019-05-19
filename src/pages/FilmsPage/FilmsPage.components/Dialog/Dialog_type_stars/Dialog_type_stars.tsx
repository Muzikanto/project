import {IconButton} from "@material-ui/core";
import * as React from "react";
import StarIcon from '@material-ui/icons/Star';
import DialogCore from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import {IDialogProps} from "./Dialog.typings";

function Transition(props: any) {
    return <Slide direction="up" {...props} />;
}

class DialogTypeStars extends React.Component<IDialogProps> {
    state: { value: number };

    constructor(props: IDialogProps) {
        super(props);

        this.state = {
            value: props.value,
        }
    }

    render(): React.ReactNode {
        return (
            <DialogCore
                open={this.props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {"How did you like the movie?"}
                </DialogTitle>
                <DialogContent style={{display: 'flex'}}>
                    {
                        this.getStars()
                    }
                </DialogContent>
            </DialogCore>
        )
    }

    private getStars(): React.ReactNode {
        let arr = [];

        for (let i = 1; i <= 10; i++) {
            arr.push(
                <div key={'Star' + i} onClick={this.props.handleChange(i)} onMouseEnter={this.onFocusStar(i)}>
                    <IconButton color={i <= this.state.value ? 'secondary' : undefined}>
                        <StarIcon/>
                    </IconButton>
                </div>
            )
        }

        return arr;
    }

    private onFocusStar = (value: number) => () => {
        this.setState({value});
    }
}

export default DialogTypeStars;
