export interface IFilmsOptions extends IFilmsOptionsFilters{
    arr: IFilm[];
}

export type IFilmsFilterSort = 'Star' | 'Date';

export interface IFilmsOptionsFilters {
    filter_genres: string[];
    filter_dates: string[];
    filter_stars: string;
    filter_sort: IFilmsFilterSort;
    filter_open: boolean;
}

export interface IFilm {
    id: string;
    name: string;
    avatar: string;
    date: string;
    image_src: string;
    stars: number;
    set_star: boolean;
    is_favorite: boolean;
    trailer_id: string;
    genres: string[];
    stars_users: number;
}

export interface IFilmToCreate {
    name: string;
    avatar: string;
    date: string;
    image_src: string;
    trailer_id: string;
    genres: string[];
}
