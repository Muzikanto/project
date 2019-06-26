import {postFetch} from "../../../utils/fetch";
import {Dispatch} from "redux";
import {actionUserSetProps} from "./actions";
import {actionShowSnackBarErrorProps, actionShowSnackBarWarningProps} from "../../Other/Other.actions/actions";
import {actionCommonShowProgressProps} from "../../Other/Other.actions/actions";
import {historyState} from "../../../history";
import {IloginRouterQuery, IloginRouterResponse} from "../../../../server/routes/auth/local_auth";
import {IregisterRouterQuery, IregisterRouterResponse} from "../../../../server/routes/auth/register";

export const actionDropSession = (drop: boolean) => async (dispatch: Dispatch) => {
    dispatch(actionCommonShowProgressProps(true));
    try {
        await postFetch('/auth/logout');

        dispatch(actionUserSetProps({user: null}));
    } catch (err) {
        dispatch(actionShowSnackBarErrorProps(`Error actionDropSession`));
    }
    dispatch(actionCommonShowProgressProps(false));
};

export const actionAuthorize = (params: IloginRouterQuery) => async (dispatch: Dispatch) => {
    dispatch(actionCommonShowProgressProps(true));
    try {
        const {response, status, message} = await postFetch<IloginRouterQuery, IloginRouterResponse>('/auth/local', params);
        console.log(response, status, message)
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

export const actionRegister = (params: IregisterRouterQuery) => async (dispatch: Dispatch) => {
    dispatch(actionCommonShowProgressProps(true));
    try {
        const {response, status, message} = await postFetch<IregisterRouterQuery, IregisterRouterResponse>('/auth/register', params);

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
