import {IVector2D} from "../../../Game.typings";

export interface ICommonEntity {
    id?: string
    name: string;
    parent?: string;

    pos: IVector2D;
}