import * as React from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import {ISelectCheckBoxProps} from "./Select_checkBox.typings";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class SelectCheckBox extends React.Component<ISelectCheckBoxProps> {
    handleChange = (event: any) => {
        this.props.onChange(event.target.value);
    };

    render(): React.ReactNode {
        const {arr, className, label} = this.props;

        return (
            <FormControl className={className}>
                <InputLabel htmlFor="select-multiple-checkbox">{label}</InputLabel>
                <Select
                    multiple
                    value={this.props.current}
                    onChange={this.handleChange}
                    input={<Input id="select-multiple-checkbox"/>}
                    renderValue={(selected: any) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {arr.map((name: string) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={this.props.current.indexOf(name) > -1}/>
                            <ListItemText primary={name}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

export default SelectCheckBox;