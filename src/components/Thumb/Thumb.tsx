import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {cn} from "@bem-react/classname";
import {IThumbProps} from "./Thumb.typings";
import {IconButton} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import StarIcon from '@material-ui/icons/Star';
import './Thumb.css';

const cnThumb = cn('Thumb');

class Thumb extends React.Component<IThumbProps> {
    render(): React.ReactNode {
        const { title, description, url, date, avatar, stars, share} = this.props;

        return (
            <Card className={cnThumb()}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe">
                            {avatar.slice(0, 1).toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    titleTypographyProps={{variant: 'h5'}}
                    title={title}
                    subheader={date}
                    className={cnThumb('Header')}
                />
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={cnThumb('Image')}
                        image={url}
                    />
                    <CardContent>
                        <Typography component="p">
                            Genre: {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <IconButton >
                        <StarIcon/>
                        {stars}
                    </IconButton>
                    <IconButton>
                        <ShareIcon/>
                        {share}
                    </IconButton>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default Thumb;
