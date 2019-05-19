import * as React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import SelectBase from '@material-ui/core/Select';
import {ISelectProps} from "./Select.typings";

class Select extends React.Component<ISelectProps> {
    handleChange = (event: any) => {
        this.props.onChange && this.props.onChange(event.target.value);
    };

    render(): React.ReactNode {
        const {className, label, arr, current} = this.props;

        return (
            <FormControl className={className}>
                <InputLabel htmlFor="select_films_sort">{label}</InputLabel>
                <SelectBase
                    value={current}
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'value',
                        id: 'select_films_sort',
                    }}
                >
                    {
                        arr.map(el => <MenuItem key={'MenuItem' + el} value={el}>{el}</MenuItem>)
                    }
                </SelectBase>
            </FormControl>
        );
    }
}

export default Select;
