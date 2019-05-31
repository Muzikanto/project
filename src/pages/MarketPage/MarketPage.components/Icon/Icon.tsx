import * as React from 'react';
import {IconButton} from "@material-ui/core";
import './Icon.scss';
import {IMarketIconProps} from "./Icon.typings";
import {cn} from "@bem-react/classname";

const cnMarketIcon = cn('MarketIcon');

class MarketIcon extends React.Component<IMarketIconProps> {
    render(): React.ReactNode {
        return (
            <IconButton className={cnMarketIcon()}>
                {this.props.icon}
                <span className={cnMarketIcon('Count', {gold: this.props.gold})}>{this.props.count}</span>
            </IconButton>
        )
    }

}

export default MarketIcon;
