import {IVector2D} from "../../../Game.typings";

export interface IEntityProps extends IVector2D{
    name: string;
    start?: IVector2D;
    target?: IVector2D;
    speed?: number;
    radius?: number;
    isStatic?: boolean;
    hp?: number;
    parent?: string;
}