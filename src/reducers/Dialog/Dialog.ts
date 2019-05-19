import {IDialogOptions} from "./Dialog.typings";
import {IReducerAction} from "../typings";
import {actionDialogTypes} from "../../actions/Dialog";

const initialState: IDialogOptions = {
    open: false,
    value: 5,
    id: null,
    type: 'content',
};

const DialogReducer = (state = initialState, action: IReducerAction) => {
    switch (action.type) {
        case actionDialogTypes.DIALOG_OPEN:
            return {...state, ...action.data};
        default:
            return state
    }
};

export default DialogReducer;
