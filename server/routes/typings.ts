import * as express from 'express';
import {ISendData} from "../middleware/sendResponse";

export interface IUserSession {
    id: string;
    email: string;
    nick: string;
}

export interface ISession extends Express.Session {
    user: IUserSession | null;
    destroy: (v: any) => void;

    id: string;
}

export interface IRequest extends express.Request {
    user: IUserSession | null;
    session: ISession;
}

export interface IResponse extends express.Response {
    sendResponse: <Response = undefined>(this: express.Response, data: ISendData<Response>) => void;
}


