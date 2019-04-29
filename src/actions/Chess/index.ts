export type IactionChessHod = (data: any) => void;
export const actionChessHod = (data: any) => (dispatch: any) => {
    dispatch({
        data,
        type: 'CHESS_SEND'
    });
};
