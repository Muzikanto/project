import {Dispatch} from "redux";
import {IDialogOptions} from "../../reducers/Dialog/Dialog.typings";

export const actionDialogTypes = {
    DIALOG_OPEN: 'DIALOG_OPEN',
};

export type IactionDialogOpen = (data: IDialogOptions) => void;
export const actionDialogOpen = (data: IDialogOptions) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actionDialogTypes.DIALOG_OPEN
    });
};
