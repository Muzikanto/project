import * as express from 'express';
import {IObject} from "../../src/utils/typings";

export function sendResponse<Response extends IObject>(res: express.Response, data: ISendData<Response>) {
    res.send(JSON.stringify(data));
}

export interface ISendData<Response> {
    status: number;
    message: string;
    response?: Response;
}
