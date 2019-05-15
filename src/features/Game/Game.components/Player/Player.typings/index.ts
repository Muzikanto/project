export interface IWeapon {
    shot: () => void;
    update: (ctx: CanvasRenderingContext2D) => void;
}

export type IGuns = 'pistol' | 'rifle' | 'shotgun';
