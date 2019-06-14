import * as React from "react";
import {IThumbContentProps} from "./Thumb-Content.typings";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import local from "../../../../pages/FilmsPage/FilmsPage.strings";

class ThumbContent extends React.Component<IThumbContentProps> {
    public render(): React.ReactNode {
        const {
            film: {
                genres,
                preview,
            },
            className,
            onContentClick,
        } = this.props;

        return (
            <div onClick={onContentClick}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={className}
                        image={preview}
                    />
                    <CardContent>
                        <b>{local.Genres}:</b> {genres.join()}
                    </CardContent>
                </CardActionArea>
            </div>
        )
    }
}

export default ThumbContent;
