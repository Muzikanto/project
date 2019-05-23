import {IChessState} from "../../../pages/ChessPage/ChessPage.components/Chess/Chess.typings";
import {Dispatch} from "redux";

export const actionsChesSocketToDispatchesTypes = {
    ON_CHESS_RESPONSE: 'ON_CHESS_RESPONSE',
    ON_CHESS_JOIN: 'ON_CHESS_JOIN',
    ON_CHESS_START: 'ON_CHESS_START',
    ON_CHESS_ERROR: 'ON_CHESS_ERROR',
};

export const actionsChessTypes = {
    ...actionsChesSocketToDispatchesTypes,
    CHESS_SEND: 'CHESS_SEND',
    CHESS_JOIN: 'CHESS_JOIN',
    CHESS_START: 'CHESS_START',
};



export type IactionChessSend = (data: IChessState) => void;
export const actionChessSend= (data: IChessState) => (dispatch: Dispatch) => {
    dispatch({
        data,
        type: actionsChessTypes.CHESS_SEND
    });
};

export type IactionChessStartGame = () => void;
export const actionChessStartGame= () => (dispatch: Dispatch) => {
    dispatch({
        data: null,
        type: actionsChessTypes.CHESS_START
    });
};

export type IactionChessJoin = (room: string) => void;
export const actionChessJoin= (room: string) => (dispatch: Dispatch) => {
    dispatch({
        data: room,
        type: actionsChessTypes.CHESS_JOIN
    });
};
