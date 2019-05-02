export const socketActionsToDispatches = {
    ON_CHESS_RESPONSE: 'ON_CHESS_RESPONSE',
    ON_CHESS_JOIN: 'ON_CHESS_JOIN',
    ON_CHESS_START: 'ON_CHESS_START',
    ON_CHESS_ERROR: 'ON_CHESS_ERROR',
};

const actions = {
    ...socketActionsToDispatches,
    SET_USER: 'SET_USER',
    CHESS_SEND: 'CHESS_SEND',
    CHESS_JOIN: 'CHESS_JOIN',
    CHESS_START: 'CHESS_START',
};

export default actions;
