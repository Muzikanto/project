import {postFetch} from "../../../src.utils/fetch";
import {Dispatch} from "redux";
import {actionUserSetProps} from "./actions";
import {actionShowSnackBarErrorProps, actionShowSnackBarWarningProps} from "../../Other/Other.actions/actions";
import {actionCommonShowProgressProps} from "../../Other/Other.actions/actions";
import {historyState} from "../../../history";
import {IAuthorizeTypings} from "../../../../server/routes/Authorize/Authorize.typings";

const Logout = (drop: boolean) => async (dispatch: Dispatch) => {
    dispatch(actionCommonShowProgressProps(true));
    try {
        await postFetch('/auth/logout');

        dispatch(actionUserSetProps({user: null}));
    } catch (err) {
        dispatch(actionShowSnackBarErrorProps(`Error actionDropSession`));
    }
    dispatch(actionCommonShowProgressProps(false));
};

const Authorize = (params: IAuthorizeTypings.LoginQuery) => async (dispatch: Dispatch) => {
    dispatch(actionCommonShowProgressProps(true));
    try {
        const {response, status, message} = await postFetch<IAuthorizeTypings.LoginQuery, IAuthorizeTypings.LoginResponse>('/auth/local', params);

        if (status === 200) {
            dispatch(actionUserSetProps({user: response}));
            historyState.replace('/');
        } else {
            dispatch(actionShowSnackBarWarningProps(`Status: ${status}, ${message}`));
        }
    } catch (err) {
        dispatch(actionShowSnackBarErrorProps(`Error actionAuthorize`));
    }
    dispatch(actionCommonShowProgressProps(false));
};

const Create = (params: IAuthorizeTypings.RegisterQuery) => async (dispatch: Dispatch) => {
    dispatch(actionCommonShowProgressProps(true));
    try {
        const {response, status, message} = await postFetch<IAuthorizeTypings.RegisterQuery, IAuthorizeTypings.RegisterResponse>('/auth/register', params);

        if (status === 200) {
            dispatch(actionUserSetProps({user: response}));
            historyState.replace('/');
        } else {
            dispatch(actionShowSnackBarWarningProps(`Status: ${status}, ${message}`));
        }
    } catch (err) {
        dispatch(actionShowSnackBarErrorProps(`Error actionRegister`));
    }
    dispatch(actionCommonShowProgressProps(false));
};

const UserActions = {
    Logout,
    Authorize,
    Create,
};

export default UserActions;