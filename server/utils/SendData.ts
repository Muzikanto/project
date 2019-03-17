import * as express from 'express';

export const sendData = (res: express.Response, status: number, message: string, response?: { [key: string]: any }) => {
    res.send(JSON.stringify({response, status, message}));
};

export interface ISendData {
    status: number;
    message: string;
    response?: { [key: string]: any };
}

export function getSendData(status: number, message: string, response?: { [key: string]: any }): ISendData {
    return {response, status, message};
}
