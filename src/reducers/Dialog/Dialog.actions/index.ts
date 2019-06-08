import {Dispatch} from "redux";
import {IDialogOptions} from "../Dialog.typings";
import {actionDialogProps} from "./actions";
import {actionFilmsSetProps} from "../../Films/Films.actions/actions";
import {IFilm} from "../../Films/Films.typings";

export const actionDialog = (data: IDialogOptions) => (dispatch: Dispatch) => {
    dispatch(actionDialogProps(data));
};

export const actionDialogWithFilm = ({dialog, film}: {dialog: IDialogOptions, film: IFilm}) => (dispatch: Dispatch) => {
    dispatch(actionDialogProps(dialog));
    dispatch(actionFilmsSetProps({film}));
};