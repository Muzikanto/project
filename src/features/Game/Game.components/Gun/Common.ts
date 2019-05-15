import {GameState} from "../State/State";
import {Bullet} from "../Entity/Bullet/Bullet";
import {Player} from "../Player/Player";
import {IVector2D} from "../../Game.typings";
import {normalizeVectorDistance} from "../../Game.helpers";

abstract class Gun {
    protected damage = 0.3;
    protected loading = 1000;
    protected speed = 15;
    protected player: Player | undefined;
    protected pos: IVector2D;

    private lastShot = new Date().getTime();

    public constructor(props: { pos?: IVector2D, player?: Player }) {
        if (props.player) {
            this.player = props.player;
            this.pos = props.player.pos;
        } else {
            this.pos = props.pos || {x: 100, y: 100};
        }
    }

    public update(ctx: CanvasRenderingContext2D) {
        if (this.player) {
            this.drawInPlayer(ctx);
            this.drawReload(ctx);
        }
    }

    public shot(target: IVector2D) {
        if (this.player) {
            const time = new Date().getTime();
            if (this.player && time - this.lastShot > this.loading) {
                const normalize = normalizeVectorDistance({...this.player.pos}, target);
                const to = {x: normalize.x * 500 + this.player.pos.x, y: normalize.y * 500 + this.player.pos.y};

                this.createBullets(to);
                this.lastShot = time;
            }
        }
    }

    protected createBullets(target: IVector2D) {
        if (this.player) {
            this.createBullet(this.player.pos, target);
        }
    }

    protected abstract drawInPlayer(ctx: CanvasRenderingContext2D): void;

    protected createBullet(pos: IVector2D, target: IVector2D) {
        if (this.player) {
            GameState.createEntity(new Bullet({
                pos: {...pos},
                parent: this.player.id,
                name: 'bullet',
                target,
                radius: 3,
                damage: this.damage,
                speed: this.speed,
            }));
        }
    }

    private drawReload(ctx: CanvasRenderingContext2D) {
        if (this.player) {
            const {pos, radius} = this.player;

            const time = new Date().getTime() - this.lastShot;
            const sizeHealthBar = radius * 2 * (time >= this.loading ? this.loading : time) / this.loading;
            const startX = pos.x - radius;
            const startY = pos.y - radius * 1.5 + 5;

            ctx.beginPath();
            ctx.fillStyle = 'blue';
            ctx.fillRect(startX, startY, sizeHealthBar, 3);
            ctx.fill();

            ctx.beginPath();
            ctx.rect(startX, startY, radius * 2, 3);
            ctx.stroke();
        }
    }
}

export default Gun;
