export interface IDialogOptions {
    id: string | null;
    open: boolean;
    value: number;
    type: IDialogTypes;
}

export type IDialogTypes =  'content' | 'stars' | 'add_film';
