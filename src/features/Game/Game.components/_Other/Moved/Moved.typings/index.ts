import {IVector2D} from "../../../../Game.typings";
import CommonEntity from "../../../Entity/CommonEntity";

export interface IMovedProps {
    pos: IVector2D;

    start?: IVector2D;
    target?: IVector2D;
    speed?: number
}

export interface IMovedPropsParent extends IMovedProps{
    parent: CommonEntity;
}
