import {IUserOptions} from "./User.typings";
import {IReducerAction} from "../typings";
import {USER_ACTIONS} from "./User.actions/keys";

const initialState: IUserOptions = {
    user: null,
};

const UserReducer = (state = initialState, action: IReducerAction) => {
    switch (action.type) {
        case USER_ACTIONS.SET:
            return {...state, ...action.data};
        default:
            return state
    }
};

export default UserReducer;
