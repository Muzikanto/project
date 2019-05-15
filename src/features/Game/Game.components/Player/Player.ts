import {GameState} from "../State/State";
import {IVector2D} from "../../Game.typings";
import {Entity} from "../Entity/Enemy/Entity";
import Gun from "../Gun/Common";
import Rifle from "../Gun/Rifle/Rifle";
import Shotgun from "../Gun/Shotgun/Shotgun";
import Pistol from "../Gun/Pistol/Pistol";

class Player extends Entity {
    public cursor: IVector2D = {x: 0, y: 0};
    public gun: Gun = this.newGun(49);

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

            this.newGun(keyCode);
        });

        document.addEventListener('keyup', (e: KeyboardEvent) => {
            const {keyCode} = e;
            delete keysPressed[keyCode];
        });
    }

    public newGun(number: number) {
        if (number >= 49 && number <= 51) {
            const gun = new ([Pistol, Rifle, Shotgun][number - 49])({player: this});
            this.gun = gun;

            return gun;
        } else {
            return new Pistol({player: this});
        }
    }

    protected draw(ctx: CanvasRenderingContext2D): void {
        super.draw(ctx);

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);

        this.gun.update(ctx);

        ctx.stroke();
    }

    private movePlayer(): void {
        if (this.speed) {
            const {keysPressed} = GameState;
            const dx = keysPressed['65'] && -1 || keysPressed['68'] && 1;
            const dy = keysPressed['87'] && -1 || keysPressed['83'] && 1;

            if (dx) {
                this.pos.x += dx * this.speed;
            }
            if (dy) {
                this.pos.y += dy * this.speed;
            }
        }
    }
}

export {Player};
