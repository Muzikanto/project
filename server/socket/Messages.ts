import {getSendData, ISendData} from "../utils/SendData";

interface ISendMessageParams {
    id_group: number;
    text: string;
    id_user: number;
}

export const Socket_new_message = (io: any) => async (_: ISendMessageParams, cb: (data: ISendData) => void) => {
    // const {id_group, id_user, text} = data;
    try {
        io.sockets.emit('new_message', {});
        cb(getSendData(200, 'Success Send', {}));
    } catch (err) {
        cb(getSendData(403, err.message, {}));
    }
};
