import * as React from 'react';
import {IInputProps, IInputState} from "./Input.typings";
import TextField, {TextFieldProps} from "@material-ui/core/TextField";
import {InputProps as StandardInputProps} from "@material-ui/core/Input";

class Input<State extends IInputState = IInputState> extends React.Component<IInputProps> {
    public state: IInputState = {
        value: '',
        error: false,
    } as IInputState;

    protected handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const {onChange} = this.props;

        onChange &&  onChange(value);
        this.setState({value});
    };

    public render(): React.ReactNode {
        const {
            label,
            spanProps,
        } = this.props;

        return (
            <TextField
                error={this.state.error}
                variant={"outlined" as any}
                label={<span {...spanProps}>{label}</span>}
                value={this.state.value}
                onChange={this.handleChange}
                InputProps={this.getInputProps()}
                {...this.getTextFieldProps()}
            />
        );
    }

    protected getInputProps(): Partial<StandardInputProps> {
        return {
            onClick: (e) => e.stopPropagation(),
            ...this.props.inputProps,
        };
    }

    protected getTextFieldProps(): Partial<TextFieldProps> {
        return {
            ...this.props.textFieldProps,
        }
    }
}

export default Input;