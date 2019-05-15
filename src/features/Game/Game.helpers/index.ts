import {IVector2D} from "../Game.typings";

export function normalizeVectorDistance(start: IVector2D, target: IVector2D) {
    const d1 = target.x - start.x;
    const d2 = target.y - start.y;

    const k = Math.sqrt(d1 ** 2 + d2 ** 2);

    const x = (d1 / k);
    const y = (d2 / k);

    return {
        x, y
    }
}