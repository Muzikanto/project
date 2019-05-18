import {IconButton} from "@material-ui/core";
import * as React from "react";
import {IThumbBottomProps, IThumbBottomPropsFromContainer} from "./Thumb-Bottom.typings";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import ShareIcon from '@material-ui/icons/Share';
import StarIcon from '@material-ui/icons/Star';
import Tooltip from "@material-ui/core/Tooltip";

class ThumbBottom extends React.Component<IThumbBottomProps & IThumbBottomPropsFromContainer> {
    render(): React.ReactNode {
        const {
            stars,
            share,
        } = this.props;

        return (
            <>
                <CardActions>
                    <Tooltip title="Stars">
                        <div onClick={this.props.setIsFavorite}>
                            <IconButton color={this.props.isLiked ? 'secondary' : undefined}>
                                <StarIcon/>
                                {stars}
                            </IconButton>
                        </div>
                    </Tooltip>
                    <Tooltip title="Shared">
                        <IconButton>
                            <ShareIcon/>
                            {share}
                        </IconButton>
                    </Tooltip>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </>
        )
    }
}

export default ThumbBottom;
