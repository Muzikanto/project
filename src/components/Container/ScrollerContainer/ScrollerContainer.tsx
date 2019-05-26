import * as React from 'react';
import {cn} from "@bem-react/classname";
import {IScrollerProps} from "./ScrollerContainer.typings";
import Left from '@material-ui/icons/ArrowLeft';
import Right from '@material-ui/icons/ArrowRight';
import './ScrollerContainer.css';

const cnScroller = cn('ScrollerContainer');

class ScrollerContainer extends React.Component<IScrollerProps> {
    refScroller = React.createRef<HTMLDivElement>();

    public render() {
        const {
            className,
            children,
        } = this.props;

        return (
            <div>
                <Left onClick={this.scroll(-1)} className={cnScroller('Left')}/>
                <Right onClick={this.scroll(1)} className={cnScroller('Right')}/>
                <div ref={this.refScroller} className={cnScroller('', [className])}>
                    {
                        children
                    }
                </div>
            </div>
        )
    }

    protected scroll = (dir: number) => (e: any) => {
        if (this.refScroller.current) {
            const left = this.refScroller.current.scrollLeft;

            if (left + 100 * dir >= 0 && left + 100 * dir <= this.refScroller.current.scrollWidth) {
                this.refScroller.current.scrollLeft = left + 100 * dir;
            }
        }
    }
}

export default ScrollerContainer;
