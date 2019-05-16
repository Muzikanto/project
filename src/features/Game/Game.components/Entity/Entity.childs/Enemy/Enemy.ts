import {IEnemyProps} from "./Enemy.typings";
import CommonEntity from "../../CommonEntity";
import {Health} from "../../../_Other/Health/Health";
import Moved from "../../../_Other/Moved/Moved";
import {Bullet} from "../Bullet/Bullet";
import Inventory from "../../../_Other/Inventory/Inventory";

export class Enemy extends CommonEntity {
    public radius: number;
    public health: Health;
    public controll: Moved;
    public inventory: Inventory;

    constructor(props: IEnemyProps) {
        super(props);

        this.radius = props.radius || 5;
        this.health = new Health({
            ...props.health,
            parent: this,
        });

        this.controll = new Moved({
            ...props.controll,
            parent: this,
        });

        this.inventory = new Inventory(this, props.inventory);
    }

    public update(ctx: CanvasRenderingContext2D): void {
        this.draw(ctx);
        this.health.update(ctx);
    }

    protected draw(ctx: CanvasRenderingContext2D): void {
        const {pos} = this.controll;
        const {radius} = this;

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    public instanciateAction(to: Bullet | CommonEntity): void {
        if (to instanceof Bullet) {
            this.health.newHealth(to.damage);
        } else {
            console.log('Touch ' + to.name);
        }
    }

    public drop() {
        this.inventory.dropItems();
        super.drop();
    }
}
