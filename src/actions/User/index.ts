import {postFetch} from "../../utils/fetch";
import {IUserOptions} from "../../reducers/User";
import {IauthorizeParams, IregisterParams} from "./User.typings/index";

export const setUser = (data: IUserOptions) => (dispatch: any) => {
    dispatch({
        data,
        type: 'SET_USER'
    });
};

export const dropSession = () => async (dispatch: any) => {
    try {
        await postFetch('/api/logout', {});
        setUser({user: null})(dispatch);
    } catch (err) {
        console.log(err);
    }
};

export const authorize = (params: IauthorizeParams) => async (dispatch: any) => {
    try {
        const data = await postFetch('/api/authorize', params);
        if (data.status === 200) {
            setUser({user: data.response.user})(dispatch);
        }
    } catch (err) {
        console.log(err);
    }
};

export const register = (params: IregisterParams) => async (dispatch: any) => {
    try {
        const data = await postFetch('/api/registration', params);
        if (data.status === 200) {
            setUser({user: data.response.user})(dispatch);
        }
    } catch (err) {
        console.log(err);
    }
};
