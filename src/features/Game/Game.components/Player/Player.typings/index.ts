import {IVector2D} from "../../../Game.typings";

export namespace Game {
    export interface IWeapon {
        damage: number;
        name: string;
        loading: number;
        speed: number;
        draw: (ctx: CanvasRenderingContext2D, {x, y}: IVector2D) => void;
        createBullets: ({x,y}: IVector2D) => void;
    }

    export type IGuns = 'pistol' | 'rifle' | 'shotgun';
}