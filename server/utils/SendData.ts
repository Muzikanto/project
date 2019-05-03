import * as express from 'express';

export const sendResponse = (res: express.Response, data: ISendData) => {
    res.send(JSON.stringify(data));
};

export interface ISendData {
    status: number;
    message: string;
    response?: { [key: string]: any };
}
