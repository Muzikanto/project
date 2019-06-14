import {Dispatch} from "redux";
import {IDialogOptions} from "../Dialog.typings";
import {actionDialogProps} from "./actions";
import {actionFilmsSetProps} from "../../Films/Films.actions/actions";
import {IFilm} from "../../Films/Films.typings";
import {historyPush} from "../../../utils/historyPush";

export const actionDialog = (data: IDialogOptions) => (dispatch: Dispatch) => {
    dispatch(actionDialogProps(data));
};

export const actionDialogWithFilm = ({dialog, film, filmData}: { dialog: IDialogOptions, film: IFilm | null, filmData?: null }) => (dispatch: Dispatch) => {
    dispatch(actionDialogProps(dialog));
    dispatch(actionFilmsSetProps({film, filmData, film_id: film ? film.id : null}));

    historyPush({film_id: film ? film.id : ''});
};