import * as io from 'socket.io-client';
import {IReducerAction, ISocketOptions} from "./typings";


const socket: ISocketOptions = io(process.env.NODE_ENV === 'development' ? 'localhost:3000' : 'localhost:3000', {
    reconnection: false,
    transports: ['websocket']
});


socket.on('connect', () => {
    console.log("соединение установлено");
});
socket.on('disconnect', () => {
    console.log('соединение разорвано')
});
socket.on('error', (reason: any) => {
    if (reason === "handshake unauthorized")
        console.log("вы вышли из сайта");
    else
        setTimeout(() => {
            socket.connect();
        }, 500);
});

socket.on('CHESS_RESPONSE', function (data: any) {
    console.log(data);
});


const reducer = (state = socket, action: IReducerAction) => {
    switch (action.type) {
        case 'CHESS_SEND':
            socket.emit('CHESS_SEND', action.data);
            return state;
        default:
            return state
    }
};

export default reducer;
