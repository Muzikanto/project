import {Dispatch} from "redux";

export const actionDialogTypes = {
    DIALOG_OPEN: 'DIALOG_OPEN',
};

type IactionDialogOpenOptions = {open: boolean, value: number, id: string | null};
export type IactionDialogOpen = (data: IactionDialogOpenOptions) => void;
export const actionDialogOpen = (data: IactionDialogOpenOptions) => (dispatch: Dispatch) => {
    dispatch({
        data: data,
        type: actionDialogTypes.DIALOG_OPEN
    });
};
