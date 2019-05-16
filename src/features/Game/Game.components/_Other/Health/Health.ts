import {Enemy} from "../../Entity/Entity.childs/Enemy/Enemy";
import { IHealthPropsWithParent} from "./Health.typings";

export class Health {
    protected hp: number;
    protected maxHp: number;
    protected showHealth: boolean = false;
    protected parent: Enemy;

    constructor(props: IHealthPropsWithParent) {
        this.hp = props.hp || 1;
        this.maxHp = this.hp;
        this.showHealth = Boolean(props.showHp);
        this.parent = props.parent;
    }

    public newHealth(change: number) {
        this.hp -= change;

        if (this.hp <= 0) {
            this.parent.drop();
        }
    }

    public update(ctx: CanvasRenderingContext2D): void {
        this.draw(ctx);
    }

    protected draw(ctx: CanvasRenderingContext2D) {
        if (this.showHealth) {
            const {controll: {pos}, radius} = this.parent;
            const sizeHealthBar = radius * 2 * this.hp / this.maxHp;
            const startX = pos.x - radius;
            const startY = pos.y - radius * 1.5;

            ctx.beginPath();
            ctx.fillStyle = 'red';
            ctx.fillRect(startX, startY, sizeHealthBar, 5);
            ctx.fill();

            ctx.beginPath();
            ctx.rect(startX, startY, radius * 2, 5);
            ctx.stroke();
        }
    }
}
