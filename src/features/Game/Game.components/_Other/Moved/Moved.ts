import {IVector2D} from "../../../Game.typings";
import Game from "../../../Game";
import {normalizeVectorDistance} from "../../../Game.helpers";
import CommonEntity from "../../Entity/CommonEntity";
import {Enemy} from "../../Entity/Entity.childs/Enemy/Enemy";
import {GameState} from "../../State/State";
import {IMovedPropsParent} from "./Moved.typings";

class Moved {
    public pos: IVector2D;
    public start: IVector2D | undefined;
    public target: IVector2D | undefined;
    public speed: number | undefined;

    protected parent: CommonEntity;

    constructor(props: IMovedPropsParent) {
        this.pos = props.pos;
        this.parent = props.parent;
        this.speed = props.speed;
        this.target = props.target;
        this.start = props.start;
    }

    protected checkExitOfCanvas(): boolean {
        const {width, height} = Game.settings;

        return (this.pos.x < 0 || this.pos.y < 0 || this.pos.x > width || this.pos.y > height);
    }

    public update(): void {
        this.move();
        this.checkInstanciateEntitys();
    }

    protected move(): void {
        const {speed, target, start} = this;

        if (target && start && speed) {

            const {x, y} = normalizeVectorDistance(start, target);

            this.pos.x += x * speed;
            this.pos.y += y * speed;

            if (this.checkExitOfCanvas()) {
                this.parent.drop();
            }
        }
    }

    public checkInstanciate(entity: Enemy): boolean {
        const {radius, controll: {pos}} = entity;

        const instX = this.pos.x > pos.x - radius && this.pos.x < pos.x + radius;
        const instY = this.pos.y > pos.y - radius && this.pos.y < pos.y + radius;

        return instX && instY;
    }

    protected checkInstanciateEntitys() {
        const list = GameState.entitys;

        for (const id in list) {
            if (id !== this.parent.id) {
                const entity = list[id];

                if (entity instanceof Enemy && this.checkInstanciate(entity)) {
                    this.parent.instanciateAction(entity);
                }
            }
        }
    }
}

export default Moved;
