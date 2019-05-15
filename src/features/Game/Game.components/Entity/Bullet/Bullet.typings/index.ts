import {IVector2D} from "../../../../Game.typings";
import {ICommonEntity} from "../../Entity.typings";

export interface IBulletProps extends ICommonEntity {
    damage: number;
    speed: number;
    target: IVector2D;

    radius?: number;
}