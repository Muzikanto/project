import * as React from 'react';
import {RefObject} from 'react';
import Canvas from "../../components/Canvas/Canvas";
import {cn} from "@bem-react/classname";
import './Game.css';
import {Entity} from "./Game.components/Entity/Entity";
import {GameState} from "./Game.components/State/State";

const cnGame = cn('Game');

class Game extends React.Component {
    public static settings = {
        width: 600,
        height: 600,
    };

    private refCanvas: RefObject<Canvas> = React.createRef();
    private ctx: CanvasRenderingContext2D | null = null;

    componentDidMount() {
        this.resize();
        window.onresize = () => {
            this.resize();
        };

        const current = this.refCanvas.current;
        this.ctx = current && current.ctx;
        const canvas = current && current.ref.current;

        if (!this.ctx || !current || !canvas) {
            throw new Error('Object is null');
        }

        GameState.player.setControlls(canvas);

        setInterval(this.canvasRender.bind(this), 1000 / 60);

        new Entity({
            name: 'player',
            x: 500,
            y: 200,
            isStatic: true,
            radius: 20,
            hp: 5,
        }).create();
    }

    render() {
        return (
            <div className={cnGame('Container')}>
                <Canvas id={'game'}
                        className={cnGame('Canvas')}
                        ref={this.refCanvas}
                        width={Game.settings.width}
                        height={Game.settings.height}
                />
            </div>
        );
    }

    private canvasRender() {
        const ctx = this.ctx;

        if (ctx) {
            const {player, entitys} = GameState;

            this.drawMap(ctx);

            player.update(ctx);

            for (const name in entitys) {
                entitys[name].update(ctx);
            }
        }
    };

    private drawMap(ctx: CanvasRenderingContext2D) {
        const {width, height} = Game.settings;
        ctx.beginPath();
        ctx.rect(0, 0, width, height);
        ctx.fillStyle = "green";
        ctx.fill();
    }

    private resize() {
        const width = window.outerWidth;
        const height = this.refCanvas.current && this.refCanvas.current.ref.current && this.refCanvas.current.ref.current.offsetHeight;

        if (width && height) {
            Game.settings.width = width;
            Game.settings.height = height;

            this.forceUpdate();
        }
    }
}

export default Game;
