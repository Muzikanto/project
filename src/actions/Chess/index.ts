import {IChessState} from "../../features/Chess/Chess.typings";
import {Dispatch} from "redux";
import actions from "../index";

export type IactionChessSend = (data: IChessState) => void;
export const actionChessSend= (data: IChessState) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actions.CHESS_SEND
    });
};
