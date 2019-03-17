import * as React from 'react';
import {IButton} from "../../Button";
import {Link} from "react-router-dom";
import {classnames} from "@bem-react/classnames";
import {withBemMod} from "@bem-react/core";


class ButtonBasisLink extends React.Component<IButton> {
    public render() {
        return (
            <Link type={this.props.type}
                  to={this.props.targetUrl ? this.props.targetUrl : '#'}
                  className={classnames(this.props.className)}
                  onClick={this.props.onClick}>{this.props.text}</Link>
        );

    }
}

export default withBemMod<IButton>('Button', {basis: 'Link'}, () => ButtonBasisLink)
