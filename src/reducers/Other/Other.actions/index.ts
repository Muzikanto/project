import {Dispatch} from "redux";
import {IOtherProgressOptions, IOtherSnackBarOptions} from "../Other.typings";

export const actionOtherTypes = {
    SHOW_PROGRESS: 'SHOW_PROGRESS',
    SHOW_SNACKBAR: 'SHOW_SNACKBAR',
};

export type IactionShowProgress = (data: IOtherProgressOptions) => void;
export const actionShowProgress = (data: IOtherProgressOptions) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actionOtherTypes.SHOW_PROGRESS
    });
};

export type IactionShowSnackBar = (data: Partial<IOtherSnackBarOptions>) => void;
export const actionShowSnackBar = (data: Partial<IOtherSnackBarOptions>) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actionOtherTypes.SHOW_SNACKBAR
    });
};

export const actionShowSnackBarError = (snack_text: string) => (dispatch: Dispatch) => {
    actionShowSnackBar({snack_variant: 'error', snack_open: true, snack_text})(dispatch);
};

export type IactionShowSnackBarWarning = (text: string) => void;
export const actionShowSnackBarWarning = (snack_text: string) => (dispatch: Dispatch) => {
    actionShowSnackBar({snack_variant: 'warning', snack_open: true, snack_text})(dispatch);
};

export const actionShowSnackBarSuccess = (snack_text: string) => (dispatch: Dispatch) => {
    actionShowSnackBar({snack_variant: 'success', snack_open: true, snack_text})(dispatch);
};