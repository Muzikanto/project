import * as React from 'react';
import {cn} from "@bem-react/classname";
import {Typography} from "@material-ui/core";
import './Description.scss';
import {IMarketDescriptionProps} from "./Description.typings";

const cnMarketDescription = cn('MarketDescription');

class MarketDescription extends React.Component<IMarketDescriptionProps> {
    render(): React.ReactNode {
        const {
            className,
            title,
            description,
        } = this.props;

        return (
            <div className={cnMarketDescription()}>
                <div className={cnMarketDescription('Container', [className])}>
                    <Typography variant={'h5'} className={cnMarketDescription('Title')}>{title}</Typography>
                    <span className={cnMarketDescription('Text')}>{description}</span>
                </div>
            </div>
        );
    }
}

export default MarketDescription;
