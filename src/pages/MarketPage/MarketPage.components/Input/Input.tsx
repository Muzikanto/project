import * as React from 'react';
import {Divider, IconButton, InputBase, Paper} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {cn} from "@bem-react/classname";
import './Input.scss';

const cnMarketInput = cn('MarketInput');

class MarketInput extends React.Component {
    render(): React.ReactNode {
        return (
            <Paper className={cnMarketInput()}>
                <InputBase placeholder="Что ищем ?"/>
                <IconButton aria-label="Search" style={{padding: 0}}>
                    <SearchIcon className={cnMarketInput('Icon')}/>
                </IconButton>
                <Divider/>
            </Paper>
        )
    }
}

export default MarketInput;
