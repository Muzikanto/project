import {postFetch} from "../../../utils/fetch";
import {Dispatch} from "redux";
import {actionUserSetProps} from "./actions";
import {actionShowSnackBarErrorProps, actionShowSnackBarWarningProps} from "../../Other/Other.actions/actions";
import {actionCommonShowProgressProps} from "../../Other/Other.actions/actions";
import {historyState} from "../../../history";
import {IloginRouterQuery, IloginRouterResponse} from "../../../../server/routes/authorize/login";
import {IregisterRouterQuery, IregisterRouterResponse} from "../../../../server/routes/authorize/register";

export const actionDropSession = (drop: boolean) => async (dispatch: Dispatch) => {
    dispatch(actionCommonShowProgressProps(true));
    try {
        await postFetch('/api/logout');

        dispatch(actionUserSetProps({user: null}));
    } catch (err) {
        dispatch(actionShowSnackBarErrorProps(`Error actionDropSession`));
    }
    dispatch(actionCommonShowProgressProps(false));
};

export const actionAuthorize = (params: IloginRouterQuery) => async (dispatch: Dispatch) => {
    dispatch(actionCommonShowProgressProps(true));
    try {
        const {response, status, message} = await postFetch<IloginRouterQuery, IloginRouterResponse>('/api/authorize', params);

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
        const {response, status, message} = await postFetch<IregisterRouterQuery, IregisterRouterResponse>('/api/register', params);

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
