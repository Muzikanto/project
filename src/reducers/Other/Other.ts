import {IReducerAction} from "../typings";
import {IOtherOptions} from "./Other.typings";
import {actionOtherTypes} from "./Other.actions";

const initialState: IOtherOptions = {
    showProgress: false,
};

const OtherReducer = (state = initialState, action: IReducerAction) => {
    switch (action.type) {
        case actionOtherTypes.SHOW_PROGRESS:
            return {...state, ...action.data};
        default:
            return state
    }
};

export default OtherReducer;
