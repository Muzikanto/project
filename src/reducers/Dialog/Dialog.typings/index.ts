import {IFilm} from "../../Films/Films.typings";

export interface IDialogOptions {
    film: IFilm | null;
    open: boolean;
    type: IDialogTypes;
}

export type IDialogTypes =  'content' | 'stars' | 'add_film';
