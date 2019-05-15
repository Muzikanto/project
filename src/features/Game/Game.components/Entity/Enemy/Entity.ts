import {IVector2D} from "../../../Game.typings";
import {IEntityProps} from "./Enemy.typings";
import CommonEntity from "../CommonEntity";

export class Entity extends CommonEntity {
    public isStatic: boolean;
    public isSolid: boolean = false;
    public start: IVector2D;
    public target: IVector2D | undefined;
    public speed: number | undefined;

    public radius: number;
    public hp: number;
    public maxHp: number;
    public showHealth: boolean = false;

    constructor(props: IEntityProps) {
        super(props);

        this.isSolid = Boolean(props.isSolid);
        this.isStatic = Boolean(props.isStatic);

        this.speed = props.speed;
        this.target = props.target;
        this.start = props.pos;

        this.radius = props.radius || 5;
        this.hp = props.hp || 1;
        this.maxHp = this.hp;
        this.showHealth = Boolean(props.showHealth);
    }

    public update(ctx: CanvasRenderingContext2D): void {
        this.draw(ctx);
    }

    public newHealth(change: number) {
        this.hp -= change;

        if (this.hp <= 0) {
            this.drop();
        }
    }

    protected draw(ctx: CanvasRenderingContext2D): void {
        this.drawHealth(ctx);

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    private drawHealth(ctx: CanvasRenderingContext2D) {
        if (this.showHealth) {
            const sizeHealthBar = this.radius * 2 * this.hp / this.maxHp;
            const startX = this.pos.x - this.radius;
            const startY = this.pos.y - this.radius * 1.5;

            ctx.beginPath();
            ctx.fillStyle = 'red';
            ctx.fillRect(startX, startY, sizeHealthBar, 5);
            ctx.fill();

            ctx.beginPath();
            ctx.rect(startX, startY, this.radius * 2, 5);
            ctx.stroke();
        }
    }
}
