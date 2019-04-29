import {getSendData, ISendData} from "../utils/SendData";

interface IChessHod {
    text: string
}

export const SocketChessHod = (io: any) => async (_: IChessHod, cb: (data: ISendData) => void) => {
    console.log('CHESS_RESPONSE')
    io.sockets.emit('CHESS_RESPONSE', {response: true});
    cb(getSendData(200, 'Success Send', {}));
};
