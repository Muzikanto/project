import {Dispatch} from "redux";
import {IDialogOptions} from "../Dialog.typings";
import {actionDialogProps} from "./actions";

const base = (data: Partial<IDialogOptions>) => (dispatch: Dispatch) => {
    dispatch(actionDialogProps(data));
};

const DialogAction = {
    base,
};

export default DialogAction;
