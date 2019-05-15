import * as React from 'react';
import {RefObject} from 'react';
import {ICanvasProps} from "./Canvas.typings";

class Canvas extends React.Component<ICanvasProps> {
    public ref: RefObject<HTMLCanvasElement> = React.createRef();
    public ctx: CanvasRenderingContext2D | null = null;

    componentDidMount() {
        this.ctx = this.ref.current && this.ref.current.getContext('2d');
    }

    public render() {
        const {id, width, height, className} = this.props;

        return (
            <canvas className={className} id={id} width={width} height={height} ref={this.ref}/>
        );
    };
}

export default Canvas;
