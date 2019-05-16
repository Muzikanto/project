import {IVector2D} from "../../../Game.typings";
import {Enemy} from "../../Entity/Entity.childs/Enemy/Enemy";
import {Bullet} from "../../Entity/Entity.childs/Bullet/Bullet";
import Gun from "../../Entity/Entity.childs/Gun/Gun";

export namespace Game {
    export interface IPlayer extends IVector2D {
        speed: number;
        radius: number;
    }

    export interface IKeysPressed {
        [key: string]: true | undefined
    }

    export interface IEntitys {
        [key: string]: IEntity;
    }

    export type IEntity = Enemy | Bullet | Gun;

}