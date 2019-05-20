import {GameState} from "../State/State";
import {IVector2D} from "../../Game.typings";
import Gun from "../Entity/Entity.childs/Gun/Gun";
import {IEnemyProps} from "../Entity/Entity.childs/Enemy/Enemy.typings";
import {Enemy} from "../Entity/Entity.childs/Enemy/Enemy";
import PlayerMoved from "./Moved";

class Player extends Enemy {
    public cursor: IVector2D = {x: 0, y: 0};
    public hand: Gun | undefined;

    constructor(props: IEnemyProps) {
        super(props);

        this.controll = new PlayerMoved({
            ...props.controll,
            parent: this,
        })
    }

    public update(ctx: CanvasRenderingContext2D) {
        super.update(ctx);

        this.controll.update();
        if (this.hand) {
            this.hand.update(ctx);
        }
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

            if (this.hand) {
                this.hand.shot({x: layerX, y: layerY});
            }
        });

        document.addEventListener('keydown', (e: KeyboardEvent) => {
            const {keyCode} = e;
            keysPressed[keyCode] = true;

            this.setItemInHand(keyCode);
        });

        document.addEventListener('keyup', (e: KeyboardEvent) => {
            const {keyCode} = e;
            delete keysPressed[keyCode];
        });
    }

    private setItemInHand(number: number) {
        if (number >= 49 && number <= 59) {
            const item = this.inventory.items[number - 49];
            item && item.setPlayer(this);

            this.hand = item;
        }
    }
}

export {Player};
