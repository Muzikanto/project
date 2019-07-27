namespace IFilmTypings {
    export interface ReducerOptions extends ReducerFiltersOptions {
        arr: Item[];
        item: Item | null;
        itemPart2: ItemPart2 | null;
        id: string | null;
    }

    export type Sort = 'star' | 'date';

    export interface ReducerFiltersOptions {
        genres: string[];
        dates: string[];
        stars: string;
        sort: Sort;
        filter_open: boolean;
        query: string;
    }

    export interface Item {
        id: string;
        name: string;
        studio?: string;
        date?: string;
        preview?: string;
        stars: number;
        stars_users: number;

        set_star: boolean;
        is_favorite: boolean;
        genres: string[];
    }

    export interface ItemPart2 {
        id: string;
        iframe_trailer: string;
        iframe_film: string;
        description?: string;
    }

    export type FullItem = Item & ItemPart2;

    export interface ItemToCreate {
        id: string;
        name: string;
        studio?: string;
        date?: string;
        preview?: string;
        genres: string[];
    }
}

export {IFilmTypings};
