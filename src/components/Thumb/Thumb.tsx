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
            film,
            className,
            onContentClick,
            onFavoriteClick,
            onStarClick,
            menuItems,
            user,
        } = this.props;

        return (
            <Card className={cnThumb({}, [className])}>
                <ThumbHeader
                    menuItems={menuItems}
                    film={film}
                    className={cnThumb('Header')}
                />
               <ThumbContent
                   onContentClick={onContentClick}
                   className={cnThumb('Content')}
                   film={film}
               />
                <ThumbBottom
                    film={film}
                    user={user}
                    onStarClick={onStarClick}
                    onFavoriteClick={onFavoriteClick}
                />
            </Card>
        );
    }
}

export default Thumb;
