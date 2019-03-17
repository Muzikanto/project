import * as io from 'socket.io-client';

export type ISocketOptions = any;

const initialState: ISocketOptions = io(process.env.NODE_ENV === 'development' ? 'localhost:3000' : 'localhost:3000', {
    reconnection: false,
    transports: ['websocket']
});


initialState.on('connect', () => {
    console.log("соединение установлено");
});
initialState.on('disconnect', () => {
    console.log('соединение разорвано')
});
initialState.on('error', (reason: any) => {
    if (reason === "handshake unauthorized")
        console.log("вы вышли из сайта");
    else
        setTimeout(() => {
            initialState.connect();
        }, 500);
});


const socket = (state = initialState, action: any) => {
    switch (action.type) {
        default:
            return state
    }
};

export default socket;
