import * as React from 'react';
import {classnames} from "@bem-react/classnames";
import {IInputProps} from "../../Input";
import Icon from "../../../Icon/Icon";
import './Input_type_base.css';
import {cn} from "@bem-react/classname";

const cnInput = cn('Input');

class InputTypeBase extends React.Component<IInputProps> {
    public render() {
        return (
            <div className={classnames(cnInput('Container'), this.props.className)}>
                {this.props.icon ? <Icon className={classnames(cnInput('Icon'))} name={this.props.icon}/> : null}
                <input type={this.props.type}
                       name={this.props.name}
                       placeholder={this.props.placeholder}
                       onChange={this.props.bemOnChange}
                       pattern={this.props.pattern}
                       title={this.props.title}
                       className={classnames(cnInput())}
                       required={this.props.required}
                       value={this.props.value}
                />
            </div>
        )
    }
}

export default InputTypeBase;
