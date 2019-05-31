import * as React from 'react';
import {IStarsProps} from "./Stars.typings";
import StarIcon from '@material-ui/icons/Star'
import {cn} from "@bem-react/classname";
import './Stars.scss';

const cnStars = cn('Stars');

class Stars extends React.Component<IStarsProps> {
    render(): React.ReactNode {
        const {
            count,
            value,
            text,
            className,
        } = this.props;

        return (
            <div className={cnStars('', [className])}>
                {new Array(count).fill(0)
                    .map((_, index) =>
                        <StarIcon
                            key={'star' + index}
                            className={cnStars('Star',{active: index < (value || 5)})}/>
                    )}
                {text && <span className={cnStars('Text')}>({text})</span>}
            </div>
        );
    }
}

export default Stars;
