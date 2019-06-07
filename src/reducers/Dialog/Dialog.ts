import {IDialogOptions} from "./Dialog.typings";
import {IReducerAction} from "../typings";
import {actionDialogTypes} from "./Dialog.actions";

const initialState: IDialogOptions = {
    open: false,
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
