import * as React from 'react';
import {cn} from "@bem-react/classname";
import {IScrollerProps} from "./ScrollerContainer.typings";
import './ScrollerContainer.css';

const cnScroller = cn('ScrollerContainer');

class ScrollerContainer extends React.Component<IScrollerProps> {
    public render() {
        const {
            className,
            children,
        } = this.props;

        return (
            <section className={cnScroller('', [className])}>
                {
                   children
                }
            </section>
        )
    }
}

export default ScrollerContainer;
