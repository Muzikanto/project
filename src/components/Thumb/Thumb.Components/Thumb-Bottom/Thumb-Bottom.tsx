import {IconButton} from "@material-ui/core";
import * as React from "react";
import {IThumbBottomProps} from "./Thumb-Bottom.typings";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import ShareIcon from '@material-ui/icons/Share';
import StarIcon from '@material-ui/icons/Star';

class ThumbBottom extends React.Component<IThumbBottomProps> {
    state: { isLiked: boolean };

    constructor(props: IThumbBottomProps) {
        super(props);
        this.state = {
            isLiked: props.isLiked,
        };
    }

    render(): React.ReactNode {
        const {
            stars,
            share,
        } = this.props;

        return (
            <CardActions>
                <div onClick={this.setFavorite}>
                    <IconButton color={this.state.isLiked ? 'secondary' : undefined}>
                        <StarIcon/>
                        {stars}
                    </IconButton>
                </div>
                <IconButton>
                    <ShareIcon/>
                    {share}
                </IconButton>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        )
    }

    setFavorite = () => {
        this.setState({isLiked: !this.state.isLiked});
    }
}

export default ThumbBottom;
