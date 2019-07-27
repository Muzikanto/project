import {IDialogOptions} from "./Dialog.typings";
import * as actions from './Dialog.actions/actions';
import {IReducerActionsTypes} from "../typings";
import {DIALOG_ACTIONS} from "./Dialog.actions/keys";

const initialState: IDialogOptions = {
    open: false,
    type: 'content',
};

const DialogReducer = (state = initialState, action: IReducerActionsTypes<typeof actions>):IDialogOptions => {
    switch (action.type) {
        case DIALOG_ACTIONS.SET:
            return {...state, ...action.data};
        default:
            return state
    }
};

export default DialogReducer;
