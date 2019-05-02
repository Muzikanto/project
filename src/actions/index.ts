export const socketActionsToDispatches = {
    CHESS_SEND: 'CHESS_SEND',
    CHESS_RESPONSE: 'CHESS_RESPONSE',
};

const actions = {
    ...socketActionsToDispatches,
    SET_USER: 'SET_USER',
    CHESS_HOD: 'CHESS_HOD'
};

export default actions;
