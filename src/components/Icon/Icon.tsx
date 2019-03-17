import * as React from 'react';
import {classnames} from "@bem-react/classnames";
import './Icon.css'
import {cn} from "@bem-react/classname";

const cnIcon = cn('Icon');

interface IIcon {
    name?: string;
    className?: string;
    onClick?: () => void;
}


class Icon extends React.Component<IIcon> {
    public render() {
        return (<i className={classnames(this.props.className, cnIcon(this.props.name))} onClick={this.props.onClick}/>);
    }
}

export default Icon;
