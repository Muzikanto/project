import {GameState} from "../State/State";
import {ICommonEntity} from "./Entity.typings";

abstract class CommonEntity {
    public id: string;
    public parent_id: string | undefined;
    public name: string;

    protected constructor(props: ICommonEntity) {
        const {entityID} = GameState;
        const id = props.name + entityID;
        GameState.entityID++;

        this.id = props.id || id;
        this.parent_id = props.parent_id;
        this.name = props.name;
    }

    public abstract update(ctx: CanvasRenderingContext2D): void

    public abstract instanciateAction(_: CommonEntity): void

    public drop() {
        delete GameState.entitys[this.id];
    }
}

export default CommonEntity;
