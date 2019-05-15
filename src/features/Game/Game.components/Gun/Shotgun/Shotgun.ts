import Gun from "../Common";
import {normalizeVectorDistance} from "../../../Game.helpers";
import {IVector2D} from "../../../Game.typings";

class Shotgun extends Gun {
    public loading = 1000;
    protected damage = 0.3;
    protected speed = 15;

    public createBullets(target: IVector2D) {
        if (this.player) {
            const pos = this.player.pos;

            for (let i = 0; i < 16; i++) {
                const r1 = 100;
                const randX = Math.floor(Math.random() * (target.x + r1 - (target.x - r1)) + target.x - r1);
                const randY = Math.floor(Math.random() * (target.y + r1 - (target.y - r1)) + target.y - r1);
                const r2 = 15;
                const startX = Math.floor(Math.random() * (pos.x + r2 - (pos.x - r2)) + pos.x - r2);
                const startY = Math.floor(Math.random() * (pos.y + r2 - (pos.y - r2)) + pos.y - r2);

                this.createBullet({x: startX, y: startY}, {x: randX, y: randY});
            }
        }
    }

    protected drawInPlayer(ctx: CanvasRenderingContext2D) {
        if (this.player) {
            const {pos, cursor} = this.player;
            const target = normalizeVectorDistance(pos, cursor);

            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            ctx.lineTo(pos.x + target.x * 50, pos.y + target.y * 50);
            ctx.arc(pos.x + target.x * 50, pos.y + target.y * 50, 3, 0, 2 * Math.PI);
            ctx.stroke();
        }
    };
}

export default Shotgun;
