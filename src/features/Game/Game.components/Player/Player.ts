import {GameState} from "../State/State";
import {IVector2D} from "../../Game.typings";
import {Entity} from "../Entity/Entity";
import {Gun} from "../Gun/Gun";

class Player extends Entity {
    public cursor: IVector2D = {x: 0, y: 0};
    public gun = new Gun(this);

    public update(ctx: CanvasRenderingContext2D) {
        this.movePlayer();
        this.draw(ctx);
    }

    public setControlls(canvas: HTMLCanvasElement) {
        const {keysPressed} = GameState;

        canvas.addEventListener('mousemove', (e: MouseEvent) => {
            const {layerY, layerX} = e;

            this.cursor.x = layerX;
            this.cursor.y = layerY;
        });

        canvas.addEventListener('click', (e: MouseEvent) => {
            const {layerY, layerX} = e;
            this.gun.shot({x: layerX, y: layerY});
        });

        document.addEventListener('keydown', (e: KeyboardEvent) => {
            const {keyCode} = e;
            keysPressed[keyCode] = true;

            this.gun.newGun(keyCode);
        });

        document.addEventListener('keyup', (e: KeyboardEvent) => {
            const {keyCode} = e;
            delete keysPressed[keyCode];
        });
    }

    protected draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

        this.gun.update(ctx);

        ctx.stroke();
    }

    private movePlayer(): void {
        if (this.speed) {
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
}

export {Player};
