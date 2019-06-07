export interface IDialogOptions {
    open: boolean;
    type: IDialogTypes | null;
}

export type IDialogTypes =  'content' | 'stars' | 'add_film' | 'change_film';
