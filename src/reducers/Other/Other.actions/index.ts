import {Dispatch} from "redux";
import {IOtherOptions} from "../Other.typings";

export const actionOtherTypes = {
    SHOW_PROGRESS: 'SHOW_PROGRESS',
};

export type IactionShowProgress = (data: IOtherOptions) => void;
export const actionShowProgress = (data: IOtherOptions) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actionOtherTypes.SHOW_PROGRESS
    });
};
