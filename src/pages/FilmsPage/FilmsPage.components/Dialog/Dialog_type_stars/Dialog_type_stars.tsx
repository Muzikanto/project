import {IconButton} from "@material-ui/core";
import * as React from "react";
import StarIcon from '@material-ui/icons/Star';
import {IDialogProps} from "./Dialog.typings";
import DialogBase from "../Base/DialogBase";
import {TransitionProps} from "@material-ui/core/transitions/transition";
import Slide from "@material-ui/core/Slide";

class DialogTypeStars extends DialogBase<IDialogProps> {
    state: { stars: number };

    constructor(props: IDialogProps) {
        super(props);

        this.state = {
            stars: props.stars,
        }
    }

    protected getTransitionComponent(props: TransitionProps): any {
        return <Slide direction="up" {...props} />
    }

    protected getTitle(): string {
        return "How did you like the movie?";
    }

    protected getContent() {
        let arr = [];

        for (let i = 1; i <= 10; i++) {
            arr.push(
                <div key={'Star' + i} onClick={this.props.handleChange(i)} onMouseEnter={this.onFocusStar(i)}>
                    <IconButton color={i <= this.state.stars ? 'secondary' : undefined}>
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
