import * as React from 'react';
import {IButton} from "../../Button";

class ButtonBasisButton extends React.Component<IButton> {
    public render() {
        return (
            <button type={this.props.type}
                    className={this.props.className}
                    onClick={this.props.onClick}>{this.props.text}</button>
        )
    }
}

export default ButtonBasisButton;
