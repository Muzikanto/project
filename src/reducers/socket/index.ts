import * as io from 'socket.io-client';
import {ISocketOptions} from "./socket.typings";

const host = process.env.NODE_ENV === 'development' ? 'localhost:3000' : 'localhost:3000';
const socket: ISocketOptions = io(host, {
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

export default socket;
