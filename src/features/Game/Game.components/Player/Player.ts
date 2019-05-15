import {GameState} from "../State/State";
import {IVector2D} from "../../Game.typings";
import {Entity} from "../Entity/Entity";
import {IEntityProps} from "../Entity/Entity.typings";

class Player implements IEntityProps {
    public id = 'muzikanto';
    public name = 'player';
    public x = 100;
    public y = 100;
    public speed = 1.8;
    public radius = 20;

    public update(ctx: CanvasRenderingContext2D) {
        this.movePlayer();
        this.draw(ctx);
    }

    public setControlls(canvas: HTMLCanvasElement) {
        const {keysPressed, cursor} = GameState;

        canvas.addEventListener('mousemove', (e: MouseEvent) => {
            const {layerY, layerX} = e;
            cursor.x = layerX;
            cursor.y = layerY;
        });

        canvas.addEventListener('click', (e: MouseEvent) => {
            const {layerY, layerX} = e;
            this.createBullet({x: layerX, y: layerY});
        });

        document.addEventListener('keydown', (e: KeyboardEvent) => {
            const {keyCode} = e;
            keysPressed[keyCode] = true;
        });

        document.addEventListener('keyup', (e: KeyboardEvent) => {
            const {keyCode} = e;
            delete keysPressed[keyCode];
        });
    }

    private createBullet(target: IVector2D) {
        const {player} = GameState;

        new Entity({
            parent: this.id,
            name: 'bullet',
            x: player.x,
            y: player.y,
            start: {
                x: player.x,
                y: player.y
            },
            target,
            speed: 20,
        }).create();
    }

    private draw(ctx: CanvasRenderingContext2D): void {
        const {cursor} = GameState;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(cursor.x, cursor.y);
        ctx.stroke();
    }

    private movePlayer(): void {
        const {keysPressed} = GameState;
        const dx = keysPressed['65'] && -1 || keysPressed['68'] && 1;
        const dy = keysPressed['87'] && -1 || keysPressed['83'] && 1;

        if (dx) {
            this.x += dx * this.speed;
        }
        if (dy) {
            this.y += dy * this.speed;
        }
    }
}

export {Player};
