import {Dispatch} from "redux";
import {IDialogTypes} from "../../reducers/Dialog/Dialog.typings";

export const actionDialogTypes = {
    DIALOG_OPEN: 'DIALOG_OPEN',
};

interface IactionDialogOpenOptions {
    open: boolean;
    value: number;
    id: string | null;
    type: IDialogTypes;
}
export type IactionDialogOpen = (data: IactionDialogOpenOptions) => void;
export const actionDialogOpen = (data: IactionDialogOpenOptions) => (dispatch: Dispatch) => {
    dispatch({
        data: data,
        type: actionDialogTypes.DIALOG_OPEN
    });
};
