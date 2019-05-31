import * as React from 'react';
import {cn} from "@bem-react/classname";
import {IIconLinkProps} from "./IconLink.typings";
import './IconLink.scss';

const cnIconLink = cn('IconLink');

class IconLink extends React.Component<IIconLinkProps> {
    render(): React.ReactNode {
        const {
            className,
            icon,
            text
        } = this.props;

        return (
            <div className={cnIconLink('', [className])}>
                {icon}<span className={cnIconLink('Text')}>{text}</span>
            </div>
        );
    }
}

export default IconLink;
