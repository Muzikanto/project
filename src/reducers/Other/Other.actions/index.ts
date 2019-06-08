import {Dispatch} from "redux";
import {actionOtherProps, actionShowSnackBarWarningProps} from "./actions";

export const actionShowSnackBar = (snack_open: boolean) => (dispatch: Dispatch) => {
    dispatch(actionOtherProps({snack_open}));
};

export const actionShowSnackBarWarning = (text: string) => (dispatch: Dispatch) => {
    dispatch(actionShowSnackBarWarningProps(text));
};
