export interface ICanvasProps {
    id: string;
    width: number;
    height: number
    draw: (ctx: CanvasRenderingContext2D) => void;
}
