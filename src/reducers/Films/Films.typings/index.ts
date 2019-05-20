export interface IFilmsOptions {
    arr: IFilm[];
    filters: IFilmsFiltersOptions
    open_filters: boolean;
}

export interface IFilm {
    id:string;
    title: string;
    avatar:string;
    date: number;
    url: string;
    genres: string[];
    stars: number;
    share: number;
    isLiked: boolean;
    trailer: string;
}

export interface IFilmsFiltersOptions {
    genres: string[];
    dates: string[];
    stars: string;
    sort: string;
}