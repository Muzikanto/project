import * as React from 'react';
import {cn} from "@bem-react/classname";
import {
    IconButton,
    Typography,
} from "@material-ui/core";
import './Filters.scss';
import FileCopy from '@material-ui/icons/FileCopy';
import LikeIcon from '@material-ui/icons/Favorite'
import BasketIcon from '@material-ui/icons/ShoppingBasket'
import MarketSelect from "../../MarketPage.components/Select/Select";
import MarketInput from "../../MarketPage.components/Input/Input";
import MarketIcon from "../../MarketPage.components/Icon/Icon";
import {IMarketFiltersProps} from "./Filters.typings";

const cnMarketFilters = cn('MarketFilters');

class MarketFilters extends React.Component<IMarketFiltersProps> {
    render(): React.ReactNode {
        const {className} = this.props;

        return (
            <div className={cnMarketFilters('', [className])}>
                <MarketSelect/>
                <MarketInput/>

                <div className={cnMarketFilters('Icons')}>
                    <MarketIcon icon={<LikeIcon/>} count={0}/>
                    <MarketIcon icon={<FileCopy/>} count={0}/>
                    <MarketIcon icon={<BasketIcon/>} count={2} gold={true}/>
                    <Typography>На сумму: <span style={{fontWeight: 'bold'}}>23 140</span> руб.</Typography>
                </div>
            </div>
        );
    }
}

export default MarketFilters;
