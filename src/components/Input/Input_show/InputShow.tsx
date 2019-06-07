import * as React from 'react';
import {IconButton} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import {IInputShowState} from "./Input_show.typings";
import Input from "../Input";
import {TextFieldProps} from "@material-ui/core/TextField";

class InputShow extends Input<IInputShowState> {
    state = {
        ...super.state,
        show: false,
    };

    handleClickShowPassword = () => {
        this.setState({show: !this.state.show});
    };


    protected getInputProps() {
        return {
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                    >
                        {this.state.show ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                </InputAdornment>
            ),
        };
    }

    protected getTextFieldProps(): Partial<TextFieldProps> {
        return {
            ...super.getTextFieldProps(),
            type: this.state.show ? 'text' : 'password',
        };
    }
}

export default InputShow;