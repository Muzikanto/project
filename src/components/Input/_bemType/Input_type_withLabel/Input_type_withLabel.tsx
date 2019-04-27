import * as React from 'react';
import {cn} from "@bem-react/classname";
import './Input_type_withLabel.css';
import {classnames} from "@bem-react/classnames";
import {withBemMod} from "@bem-react/core";
import {IInputProps} from "../../Input.typings";

const cnInput = cn('Input_withLabel');

class InputTypeWithLabel extends React.Component<IInputProps> {
    public render() {
        return (
            <div className={cnInput('Container')}>
                <input type={this.props.type}
                       name={this.props.name}
                       onChange={this.props.bemOnChange}
                       title={this.props.title}
                       className={cnInput('Input')}
                       required={this.props.required}
                       pattern={this.props.pattern}
                       value={this.props.value}/>
                <label className={classnames(cnInput('Label'))}>{this.props.placeholder}</label>
                <span className={cnInput('Line')}/>
            </div>
        )
    }
}

export default withBemMod<IInputProps>('Input', {bemType: 'withLabel'}, () => InputTypeWithLabel);
