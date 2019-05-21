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
    date: number;
    image_src: string;
    genres: string[];
    stars: number;
    share: number;
    isLiked: boolean;
    trailerId: string;
}