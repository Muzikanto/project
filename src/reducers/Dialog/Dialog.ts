import {IDialogOptions} from "./Dialog.typings";
import {IReducerAction} from "../typings";
import {actionDialogTypes} from "../../actions/Dialog";

const initialState: IDialogOptions = {
    open: false,
    film: null,
    type: 'content',
};

const DialogReducer = (state = initialState, action: IReducerAction) => {
    switch (action.type) {
        case actionDialogTypes.DIALOG_ACTION:
            return {...state, ...action.data};
        default:
            return state
    }
};

export default DialogReducer;
