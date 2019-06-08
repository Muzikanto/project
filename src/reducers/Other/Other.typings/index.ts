export type IOtherOptions = IOtherSnackBarOptions & IOtherProgressOptions;

export interface IOtherProgressOptions {
    progress_show: boolean;
}

export interface IOtherSnackBarOptions {
    snack_text: string;
    snack_open: boolean;
    snack_variant: ISnackBarVariantes;
}

export type ISnackBarVariantes = 'info' | 'error' | 'success' | 'warning';