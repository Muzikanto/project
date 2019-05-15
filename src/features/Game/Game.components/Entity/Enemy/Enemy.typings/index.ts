import {IVector2D} from "../../../../Game.typings";
import {ICommonEntity} from "../../Entity.typings";

export interface IEntityProps  extends ICommonEntity{
    isSolid?: boolean;
    isStatic?: boolean;

    target?: IVector2D;
    speed?: number;

    radius?: number;
    hp?: number;
    showHealth?: boolean;

    damage?: number;
}