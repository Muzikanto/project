import * as React from 'react';
import {IInputProps, IInputState} from "./Input.typings";
import TextField from "@material-ui/core/TextField";
import {InputProps as StandardInputProps} from "@material-ui/core/Input";

class Input<State = {}, Props ={}> extends React.Component<IInputProps & Props> {
    public state: IInputState & State = {
        value: '',
        error: false,
    } as IInputState & State;

    protected handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({value: event.target.value});
    };

    public render(): React.ReactNode {
        const {
            className,
            label,
        } = this.props;

        return (
            <TextField
                error={this.state.error}
                className={className}
                variant="outlined"
                type={this.getType()}
                label={label}
                value={this.state.value}
                onChange={this.handleChange}
                InputProps={this.getInputProps()}
            />
        );
    }

    protected getInputProps(): undefined | Partial<StandardInputProps> {
        return undefined;
    }

    protected getType(): undefined | 'text' | 'password' {
        return undefined;
    }
}

export default Input;