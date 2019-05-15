import {IVector2D} from "../../../Game.typings";
import {GameState} from "../../State/State";
import {normalizeVectorDistance} from "../../../Game.helpers";
import {Entity} from "../Enemy/Entity";
import {IBulletProps} from "./Bullet.typings";
import CommonEntity from "../CommonEntity";

class Bullet extends CommonEntity {
    public start: IVector2D;
    public target: IVector2D;
    public speed: number;

    public radius: number;
    public damage: number;

    constructor(props: IBulletProps) {
        super(props);

        this.speed = props.speed;
        this.target = props.target;
        this.start = {...props.pos};
        this.damage = props.damage;

        this.radius = props.radius || 5;
    }

    public update(ctx: CanvasRenderingContext2D): void {
        this.moveToTarget();
        this.checkInstanciateEntitys();
        this.draw(ctx);
    }

    //

    protected draw(ctx: CanvasRenderingContext2D): void {
        const {pos, radius} = this;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    protected checkInstanciateEntitys() {
        const list = GameState.entitys;

        for (const name in list) {
            if (name !== this.id) {
                const entity = list[name];

                if (entity instanceof Entity && this.checkInstanciate(entity)) {
                    this.instanciateAction(entity);
                }
            }
        }
    }

    private moveToTarget(): void {
        const {speed, target, start} = this;

        const {x, y} = normalizeVectorDistance(start, target);

        this.pos.x += x * speed;
        this.pos.y += y * speed;

        if (this.checkExitOfCanvas()) {
            this.drop();
        }
    }

    // События

    private instanciateAction(to: Entity) {
        if (to.isSolid && this.parent !== to.id) {
            this.drop();
            to.newHealth(this.damage);
        }
    }
}

export {
    Bullet
}
