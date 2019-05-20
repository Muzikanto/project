import * as React from 'react';
import {IconButton} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import {IInputState} from "./Input_show.typings";
import Input from "../Input";

class InputShow extends Input<IInputState> {
    state = {
        ...super.state,
        show: false,
    };

    handleClickShowPassword = () => {
        this.setState({show: !this.state.show});
    };

    protected getType() {
        return this.state.show ? 'text' : 'password';
    }

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
}

export default InputShow;