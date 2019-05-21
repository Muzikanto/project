import * as React from 'react';
import Card from '@material-ui/core/Card';
import {cn} from "@bem-react/classname";
import {IThumbProps} from "./Thumb.typings";
import ThumbHeader from "./Thumb.Components/Thumb-Header/Thumb-Header";
import './Thumb.css';
import ThumbBottom from "./Thumb.Components/Thumb-Bottom/Thumb-Bottom";
import ThumbContent from "./Thumb.Components/Thumb-Content/Thumb-Content";
import {parseDate} from "../../utils/parseDate";

const cnThumb = cn('Thumb');

class Thumb extends React.Component<IThumbProps> {
    render(): React.ReactNode {
        const {
            genres,
            image_src,
            stars,
            share,
            className,
            name,
            date,
            avatar,
            isLiked,
            onContentClick,
            onStarClick,
            menuItems,
        } = this.props;

        return (
            <Card className={cnThumb({}, [className])}>
                <ThumbHeader
                    menuItems={menuItems}
                    name={name}
                    date={parseDate(date)}
                    avatar={avatar}
                    className={cnThumb('Header')}
                />
               <ThumbContent
                   onContentClick={onContentClick}
                   className={cnThumb('Content')}
                   genres={genres}
                   image_src={image_src}
               />
                <ThumbBottom
                    name={name}
                    onStarClick={onStarClick}
                    isLiked={isLiked}
                    share={share}
                    stars={stars}
                />
            </Card>
        );
    }
}

export default Thumb;
