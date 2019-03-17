import {cn} from '@bem-react/classname';
import * as React from 'react';
import './ImageBlock.css'
import {classnames} from "@bem-react/classnames";
import {RefObject} from "react";

const cnImage = cn('Image');

interface IImage {
    src: string;
    className?: string;
    onClick?: () => void;
    refSrc?: RefObject<HTMLImageElement>;
}

class ImageBlock extends React.Component<IImage> {
    public state: { className: string } = {className: ''};

    constructor(props: IImage) {
        super(props)
    }

    public render() {
        const mainClass = classnames(cnImage());
        return (
            <div className={classnames(cnImage(), mainClass)}>
                <img ref={this.props.refSrc}
                     onMouseEnter={this.hovered}
                     onMouseOut={this.leave}
                     onMouseLeave={this.leave}
                     onClick={this.props.onClick}
                     className={classnames(this.props.className, cnImage('Plane'), this.state.className, mainClass)}
                     src={this.props.src}/>
            </div>
        )
    }

    private hovered = () => {
        this.setState({className: cnImage('Hovered')})
    };

    private leave = () => {
        this.setState({className: ''})
    };
}

export default ImageBlock;

