export interface IFilmsOptions extends IFilmsOptionsFilters{
    arr: IFilm[];
    film: IFilm | null;
    filmData: IFilmFull | null;
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
    avatar?: string ;
    date?: string;
    image_src?: string;
    stars: number;
    set_star: boolean;
    is_favorite: boolean;
    genres: string[];
    stars_users: number;
}

export interface IFilmFull extends IFilm{
    trailer_id?: string;
    description?: string;
}

export interface IFilmToCreate {
    name: string;
    avatar?: string;
    date?: string;
    image_src?: string;
    trailer_id?: string;
    genres: string[];
}
