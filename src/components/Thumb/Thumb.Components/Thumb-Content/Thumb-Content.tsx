import * as React from "react";
import {IThumbContentProps} from "./Thumb-Content.typings";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

class ThumbContent extends React.Component<IThumbContentProps> {
    render(): React.ReactNode {
        const {
            genres,
            url,
            className,
            onContentClick,
        } = this.props;

        return (
            <div onClick={onContentClick}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={className}
                        image={url}
                    />
                    <CardContent>
                        <b>Genres:</b> {genres.join()}
                    </CardContent>
                </CardActionArea>
            </div>
        )
    }
}

export default ThumbContent;