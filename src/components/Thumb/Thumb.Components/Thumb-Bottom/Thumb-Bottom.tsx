import {IconButton} from "@material-ui/core";
import * as React from "react";
import {IThumbBottomProps} from "./Thumb-Bottom.typings";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import ShareIcon from '@material-ui/icons/Share';
import StarIcon from '@material-ui/icons/Star';
import Tooltip from "@material-ui/core/Tooltip";

class ThumbBottom extends React.Component<IThumbBottomProps> {
    render(): React.ReactNode {
        const {
            film: {
                set_star,
                is_favorite,
                stars,
                name,
                stars_users,
                date,
            },
            onStarClick,
            onFavoriteClick,
            user,
        } = this.props;

        const tooltipStar = user ? stars_users > 0 ? stars_users + ' users' : 'Set First Star' : 'Need Authorize';

        return (
            <>
                <CardActions>
                    <Tooltip title={tooltipStar}>
                        <div onClick={onStarClick}>
                            <IconButton color={set_star ? 'secondary' : undefined}>
                                <StarIcon/>
                                {stars.toFixed(2)}
                            </IconButton>
                        </div>
                    </Tooltip>
                    <Tooltip title={is_favorite ? 'Remove from Favorite' : 'Add to Favorite'}>
                        <div onClick={onFavoriteClick}>
                            <IconButton color={is_favorite ? 'secondary' : undefined}>
                                <ShareIcon/>
                            </IconButton>
                        </div>
                    </Tooltip>
                    <Tooltip title="Find in Google">
                        <a target={'_blank'}
                           rel="noopener noreferrer"
                           href={'https://www.google.com/search?q=фильм ' + name + ' ' + (date ? new Date(date).getFullYear() : '')}
                           style={{textDecoration: 'none', boxShadow: '6px 4px 12px -8px rgba(131, 125, 125, 0.75)'}}>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </a>
                    </Tooltip>
                </CardActions>
            </>
        )
    }
}

export default ThumbBottom;
