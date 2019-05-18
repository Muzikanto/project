import * as React from 'react';
import Card from '@material-ui/core/Card';
import {cn} from "@bem-react/classname";
import {IThumbProps} from "./Thumb.typings";
import ThumbHeader from "./Thumb.Components/Thumb-Header/Thumb-Header";
import './Thumb.css';
import ThumbBottom from "./Thumb.Components/Thumb-Bottom/Thumb-Bottom";
import ThumbContent from "./Thumb.Components/Thumb-Content/Thumb-Content";

const cnThumb = cn('Thumb');

class Thumb extends React.Component<IThumbProps> {
    render(): React.ReactNode {
        const {
            genres,
            url,
            stars,
            share,
            className,
            title,
            date,
            avatar,
            isLiked,
        } = this.props;

        return (
            <Card className={cnThumb({}, [className])}>
                <ThumbHeader
                    title={title}
                    date={date}
                    avatar={avatar}
                    className={cnThumb('Header')}
                />
               <ThumbContent
                   className={cnThumb('Image')}
                   genres={genres}
                   url={url}
               />
                <ThumbBottom
                    isLiked={isLiked}
                    share={share}
                    stars={stars}
                />
            </Card>
        );
    }
}

export default Thumb;
