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

export function rotateVector(vector: IVector2D, angle: number): IVector2D {
    const result: IVector2D = {...vector};

    result.x = vector.x * Math.cos(angle) - vector.y * Math.sin(angle);
    result.y = vector.x * Math.sin(angle) + vector.y * Math.cos(angle);

    return result;
}

export function angleOfVectors(vec1: IVector2D, vec2: IVector2D) {
    return Math.atan2(vec1.y - vec2.y, vec1.x - vec2.x);
}

export function toRadians(v: number) {
    return v / 180 * Math.PI;
}

export function toDegree(v: number) {
    return v * 180 / Math.PI;
}

export const Helpers = {
    toDegree,
    toRadians,
    angleOfVectors,
    rotateVector,
    normalizeVectorDistance,
};
