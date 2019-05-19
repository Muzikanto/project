export interface IFilmsOptions {
    arr: IFilm[];
    filters: IFilmsFiltersOptions
}

export interface IFilm {
    id:string
    title: string
    avatar:string
    date: string
    url: string
    genres: string[]
    stars: number
    share: number
    isLiked: boolean
    trailer: string;
}

export interface IFilmsFiltersOptions {
    genres: string[];
    dates: string[];
    stars: string;
    sort: string;
}