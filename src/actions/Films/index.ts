import {Dispatch} from "redux";

export const actionFilmsTypes = {
    FILMS_SET_STAR: 'FILMS_SET_STAR',
};

type IactionFilmsSetStarOptions = {star: number, id: string};
export type IactionFilmsSetStar = (data: IactionFilmsSetStarOptions) => void;
export const actionFilmsSetStar = (data: IactionFilmsSetStarOptions) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actionFilmsTypes.FILMS_SET_STAR
    });
};
