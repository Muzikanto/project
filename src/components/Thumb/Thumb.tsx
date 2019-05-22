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
            image_src,
            stars,
            is_favorite,
            className,
            name,
            date,
            avatar,
            set_star,
            onContentClick,
            onStarClick,
            menuItems,
        } = this.props;

        return (
            <Card className={cnThumb({}, [className])}>
                <ThumbHeader
                    menuItems={menuItems}
                    name={name}
                    date={date}
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
                    set_star={set_star}
                    is_favorite={is_favorite}
                    stars={stars}
                />
            </Card>
        );
    }
}

export default Thumb;
