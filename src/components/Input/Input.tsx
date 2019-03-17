import * as React from 'react';
import {ChangeEvent} from "react";
import './Input.css';
import {IInput} from "./Input.typings";
import {ComposedInput} from "./Input.compose";


class Input extends React.Component<IInput> {
    public state: { text: string } = {text: ''};

    public render() {
        return (
            <ComposedInput {...{...this.props,...{bemOnChange:this.onChange}}} value={this.state.text}/>
        )
    }

    public clearText = () => {
        this.setState({text: ''});
    };

    public onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        this.setState({text: value});
        this.props.onChangeCB && this.props.onChangeCB(value);
    }
}

export default Input;
