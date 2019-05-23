import {Dispatch} from "redux";
import {IDialogOptions} from "../Dialog.typings";

export const actionDialogTypes = {
    DIALOG_ACTION: 'DIALOG_ACTION',
};

export type IactionDialog = (data: IDialogOptions) => void;
export const actionDialog = (data: IDialogOptions) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actionDialogTypes.DIALOG_ACTION
    });
};
