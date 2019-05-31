import * as React from 'react';
import {IMarketContactProps} from "./ContactItem.typings";
import {cn} from "@bem-react/classname";
import './ContactItem.scss';

const cnMarketContact = cn('MarketContactItem');

class MarketContactItem extends React.Component<IMarketContactProps> {
    render(): React.ReactNode {
        const Icon = this.props.icon;

        return (
            <div className={cnMarketContact()}>
                <Icon className={cnMarketContact('Icon')}/>
                <div className={cnMarketContact('List')}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default MarketContactItem;