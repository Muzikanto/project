import * as express from 'express';
import {IObject} from "../../../src/utils/typings";
import {RequestHandlerParams} from "express-serve-static-core";
import {IResponse} from "../../routes/typings";

function sendResponse<Response extends IObject>(this: express.Response, data: ISendData<Response>) {
    return this.status(data.status).send(typeof data === 'object' ? JSON.stringify(data) : data);
}

export interface ISendData<Response> {
    status: number;
    message: string;
    response?: Response;
}

export default ((req: express.Request, res: IResponse, next: express.NextFunction) => {
    res.sendResponse = sendResponse.bind(res);
    next();
}) as RequestHandlerParams;
