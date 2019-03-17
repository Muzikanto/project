import {cn} from '@bem-react/classname';
import * as React from 'react';
import './Thumb.css'
import {classnames} from "@bem-react/classnames";
import {RefObject} from "react";

const cnThumb = cn('Thumb');

interface IThumb {
    src: string;
    className?: string;
    onClick?: () => void;
    refSrc?: RefObject<HTMLImageElement>;
}

class Thumb extends React.Component<IThumb> {
    public state: { className: string } = {className: ''};

    public render() {
        const mainClass = classnames(cnThumb());
        return (
            <div className={classnames(cnThumb(), mainClass)}>
                <img ref={this.props.refSrc}
                     onMouseEnter={this.hovered}
                     onMouseOut={this.leave}
                     onMouseLeave={this.leave}
                     onClick={this.props.onClick}
                     className={classnames(this.props.className, cnThumb('Plane'), this.state.className, mainClass)}
                     src={this.props.src}/>
            </div>
        )
    }

    private hovered = () => {
        this.setState({className: cnThumb('Hovered')})
    };

    private leave = () => {
        this.setState({className: ''})
    };
}

export default Thumb;

