import {Dispatch} from "redux";
import {actionOtherProps, actionShowSnackBarWarningProps} from "./actions";

export const ShowSnackBar = (snack_open: boolean) => (dispatch: Dispatch) => {
    dispatch(actionOtherProps({snack_open}));
};

const ShowSnackBarWarning = (text: string) => (dispatch: Dispatch) => {
    dispatch(actionShowSnackBarWarningProps(text));
};

const OtherActions = {
    ShowSnackBar,
    ShowSnackBarWarning,
};

export default OtherActions;
