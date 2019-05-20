import {postFetch} from "../../utils/fetch";
import {IactionAuthorizeParams, IactionRegisterParams} from "./User.typings";
import {Dispatch} from "redux";
import {IUserOptions} from "../../reducers/User/User.typings";
import actions from "../index";

export const actionSetUser = (data: IUserOptions) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actions.SET_USER
    });
};

export const actionDropSession = () => async (dispatch: Dispatch) => {
    try {
        await postFetch('/api/logout');

        actionSetUser({user: null})(dispatch);
    } catch (err) {
        // Need Logic
    }
};

export const actionAuthorize = (params: IactionAuthorizeParams) => async (dispatch: Dispatch) => {
    try {
        const data = await postFetch('/api/authorize', params);
        if (data.status === 200) {
            actionSetUser({user: data.response.user})(dispatch);
        } else {
            // Need Logic
        }
    } catch (err) {
        // Need Logic
    }
};

export const actionRegister = (params: IactionRegisterParams) => async (dispatch: Dispatch) => {
    try {
        const data = await postFetch('/api/register', params);
        if (data.status === 200) {
            actionSetUser({user: data.response.user})(dispatch);
        } else {
            // Need Logic
        }
    } catch (err) {
        // Need Logic
    }
};
