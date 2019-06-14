export interface IFilmsOptions extends IFilmsOptionsFilters {
    arr: IFilm[];
    film: IFilm | null;
    filmData: IFilmData | null;
    film_id: string | null;
}

export type IFilmsFilterSort = 'star' | 'date';

export interface IFilmsOptionsFilters {
    genres: string[];
    dates: string[];
    stars: string;
    sort: IFilmsFilterSort;
    filter_open: boolean;
    query: string;
}

export interface IFilm {
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

export interface IFilmData {
    id: string;
    iframe_trailer: string;
    iframe_film: string;
    description?: string;
}

export type IFullFilm = IFilmData & IFilm;

export interface IFilmToCreate {
    id: string;
    name: string;
    studio?: string;
    date?: string;
    preview?: string;
    genres: string[];
}

export interface IactionSelectFilmsOptions {
    page?: number;
    query?: string;
    disableFilters?: boolean;
}
