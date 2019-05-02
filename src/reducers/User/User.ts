import {IUserOptions} from "./User.typings";
import {IReducerAction} from "../typings";
import actions from "../../actions";

const initialState: IUserOptions = {
    user: null,
};

const UserReducer = (state = initialState, action: IReducerAction) => {
    switch (action.type) {
        case actions.SET_USER:
            return {...state, ...action.data};
        default:
            return state
    }
};

export default UserReducer;
