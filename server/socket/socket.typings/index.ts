import {Handshake, Socket} from "socket.io";
import {ISession, IUserSession} from "../../routes/typings";

export interface ISocket extends Socket {
    handshake: IHandshake;
}

export interface IHandshake extends Handshake {
    user: IUserSession;
    session: ISession;
    cookies: any;
}
