import {IFilm} from "../../Films/Films.typings";

export interface IDialogOptions {
    film: IFilm | null;
    open: boolean;
    type: IDialogTypes | null;
}

export type IDialogTypes =  'content' | 'stars' | 'add_film' | 'change_film';
