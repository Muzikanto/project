export interface IChessState {
    arr: IChessFigure[];
    next: {
        [key: number]: 1 | 2;
    };
    current?: number;
}

export interface IChessHashMap {
    [key: string]: {
        text: string,
        hod: (index: number) => {
            attack: number[],
            active: number[]
        };
    }
}

export type IChessFigure = 'Слон' | 'Ладья' | 'Конь' | 'Пешка' | 'Ферзь' | 'Король' | '';
