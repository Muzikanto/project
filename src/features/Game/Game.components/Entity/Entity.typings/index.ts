import {IVector2D} from "../../../Game.typings";

export interface IEntityProps extends IVector2D{
    id?: string
    name: string;
    parent?: string;

    isSolid?: boolean;
    isStatic?: boolean;

    start?: IVector2D;
    target?: IVector2D;
    speed?: number;

    radius?: number;
    hp?: number;
    showHealth?: boolean;

    damage?: number;
}