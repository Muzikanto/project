import {IReducerActionsTypes} from "../typings";
import {IOtherOptions} from "./Other.typings";
import {OTHER_ACTIONS} from "./Other.actions/keys";
import * as actions from './Other.actions/actions';

const initialState: IOtherOptions = {
    progress_show: false,
    snack_open: false,
    snack_text: '',
    snack_variant: 'info',
};

const OtherReducer = (state = initialState, action: IReducerActionsTypes<typeof actions>): IOtherOptions => {
    switch (action.type) {
        case OTHER_ACTIONS.SET:
            return {...state, ...action.data};
        default:
            return state
    }
};

export default OtherReducer;
