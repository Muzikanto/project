import * as React from 'react';
import MessIcon from '@material-ui/icons/RateReview'
import {cn} from "@bem-react/classname";
import './Price.scss';

const cnMarketPrice = cn('MarketPrice');

class MarketPrice extends React.Component<{ value: number }> {
    render(): React.ReactNode {
        const strPrice = this.props.value
            .toString()
            .split('')
            .reverse()
            .map((el, i) => {
                if (i % 3 === 0) {
                    return el + ' ';
                } else {
                    return el;
                }
            })
            .reverse()
            .join('');

        return (
            <div className={cnMarketPrice()}>
                <span className={cnMarketPrice('Text')}>{strPrice} руб.</span>
                <MessIcon className={cnMarketPrice('Icon')}/>
            </div>

        )
    }
}

export default MarketPrice;
