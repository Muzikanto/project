import * as React from 'react';
import {FormControl, InputBase, MenuItem, Select} from "@material-ui/core";
import {cn} from "@bem-react/classname";
import './Select.scss';

const cnMarketSelect = cn('MarketSelect');

class MarketSelect extends React.Component {
    render(): React.ReactNode {
        return (
            <FormControl>
                <Select
                    value={1}
                    input={<InputBase className={cnMarketSelect('Input')} />}
                >
                    <MenuItem value={1}>Каталог</MenuItem>
                    <MenuItem value={2}>Каталог 2</MenuItem>
                    <MenuItem value={3}>Каталог 3</MenuItem>
                </Select>
            </FormControl>
        );
    }
}

export default MarketSelect;
