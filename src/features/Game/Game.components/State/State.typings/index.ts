import {IVector2D} from "../../../Game.typings";
import {Entity} from "../../Entity/Enemy/Entity";
import {Bullet} from "../../Entity/Bullet/Bullet";

export namespace Game {
    export interface IPlayer extends IVector2D {
        speed: number;
        radius: number;
    }

    export interface IKeysPressed {
        [key: string]: true | undefined
    }

    export interface IEntitys {
        [key: string]: Entity | Bullet;
    }

}