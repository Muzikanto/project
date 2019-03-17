import * as React from 'react';
import {compose, IClassNameProps} from "@bem-react/core";
import InputTypeBase from "./_bemType/Input_type_base/Input_type_base";
import {ChangeEvent} from "react";
import './Input.css';
import InputTypeWithLabel from "./_bemType/Input_type_withLabel/Input_type_withLabel";


interface IInput extends IClassNameProps {
    pattern?: string;
    type?: string;
    value?: string;
    title?: string;
    required?: boolean;
    className?: string;

    placeholder?: string;
    bemType?: 'withLabel'
    name?: string;
    onChangeCB?: (value: string) => void;

    icon?: string;

    success?: boolean;
}


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

export interface IInputProps extends IInput{
    bemOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ComposedInput = compose<IInputProps>(
    InputTypeWithLabel
)(InputTypeBase);

export default Input;



