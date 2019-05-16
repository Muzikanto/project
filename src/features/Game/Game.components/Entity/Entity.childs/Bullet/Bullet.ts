import {Enemy} from "../Enemy/Enemy";
import {IBulletProps} from "./Bullet.typings";
import CommonEntity from "../../CommonEntity";
import Moved from "../../../_Other/Moved/Moved";

class Bullet extends CommonEntity {
    private controll: Moved;

    public radius: number;
    public damage: number;

    constructor(props: IBulletProps) {
        super(props);

        this.controll = new Moved({
            pos: {...props.pos},
            parent: this,
            start: {...props.pos},
            target: props.target,
            speed: props.speed,
        });
        this.damage = props.damage;
        this.radius = props.radius || 5;
    }

    public update(ctx: CanvasRenderingContext2D): void {
        this.controll.update();
        this.draw(ctx);
    }

    protected draw(ctx: CanvasRenderingContext2D): void {
        const {pos} = this.controll;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    // События

    public instanciateAction(to: Enemy) {
        if (this.parent_id !== to.id) {
            this.drop();
            to.instanciateAction(this);
        }
    }
}

export {
    Bullet
}
