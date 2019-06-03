import {IconButton} from "@material-ui/core";
import * as React from "react";
import StarIcon from '@material-ui/icons/Star';
import {IDialogStarsProps} from "./Dialog.typings";
import {TransitionProps} from "@material-ui/core/transitions/transition";
import Slide from "@material-ui/core/Slide";
import Dialog from "../../../../../components/Dialog";

class DialogTypeStars extends React.Component<IDialogStarsProps> {
    state: { stars: number };

    constructor(props: IDialogStarsProps) {
        super(props);

        this.state = {
            stars: props.stars,
        }
    }

    render(): React.ReactNode {
        const {
            title,
        } = this.props;

        return (
            <Dialog
                transitionComponent={this.getTransitionComponent}
                title={title}>
                {this.getStars()}
            </Dialog>
        )
    }

    protected getStars() {
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

    protected getTransitionComponent(props: TransitionProps): any {
        return <Slide direction="up" {...props} />
    }

    private onFocusStar = (stars: number) => () => {
        this.setState({stars});
    }
}

export default DialogTypeStars;
