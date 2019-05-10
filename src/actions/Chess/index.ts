import {IChessState} from "../../pages/ChessPage/ChessPage.components/Chess/Chess.typings";
import {Dispatch} from "redux";
import actions from "../index";

export type IactionChessSend = (data: IChessState) => void;
export const actionChessSend= (data: IChessState) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actions.CHESS_SEND
    });
};

export type IactionChessStartGame = () => void;
export const actionChessStartGame= () => (dispatch: Dispatch) => {
    dispatch({
        data: null,
        type: actions.CHESS_START
    });
};

export type IactionChessJoin = (room: string) => void;
export const actionChessJoin= (room: string) => (dispatch: Dispatch) => {
    dispatch({
        data: room,
        type: actions.CHESS_JOIN
    });
};
