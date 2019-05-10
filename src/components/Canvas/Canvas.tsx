import * as React from 'react';
import {RefObject} from 'react';
import {ICanvasProps} from "./Canvas.typings";

class Canvas extends React.Component<ICanvasProps> {
    private ref: RefObject<HTMLCanvasElement> = React.createRef();
    private ctx: CanvasRenderingContext2D | null = null;

    componentDidMount() {
        this.ctx = this.ref.current && this.ref.current.getContext('2d');
        this.ctx && this.props.draw(this.ctx);
    }

    public render() {
        const {id, width, height} = this.props;

        return (
            <canvas id={id} width={width} height={height} ref={this.ref}/>
        );
    };
}

export default Canvas;
