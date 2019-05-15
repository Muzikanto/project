import {IVector2D} from "../../Game.typings";
import {GameState} from "../State/State";
import {ICommonEntity} from "./Entity.typings";
import Game from "../../Game";
import {Entity} from "./Enemy/Entity";

abstract class CommonEntity {
    public pos: IVector2D;

    public target: IVector2D | undefined;
    public speed: number | undefined;

    public id: string;
    public parent: string | undefined;
    public name: string;

    protected constructor(props: ICommonEntity) {
        const {entityID} = GameState;
        const id = props.name + entityID;
        GameState.entityID++;

        this.pos = props.pos;

        this.id = props.id || id;
        this.parent = props.parent;
        this.name = props.name;
    }

    abstract update(_: CanvasRenderingContext2D): void

    protected abstract draw(ctx: CanvasRenderingContext2D): void

    protected checkExitOfCanvas(): boolean {
        const {width, height} = Game.settings;

        return (this.pos.x < 0 || this.pos.y < 0 || this.pos.x > width || this.pos.y > height);
    }

    protected drop() {
        delete GameState.entitys[this.id];
    }

    protected checkInstanciate(entity: Entity): boolean {
        const r2 = entity.radius;

        const instX = this.pos.x > entity.pos.x - r2 && this.pos.x < entity.pos.x + r2;
        const instY = this.pos.y > entity.pos.y - r2 && this.pos.y < entity.pos.y + r2;

        return instX && instY;
    }
}

export default CommonEntity;
