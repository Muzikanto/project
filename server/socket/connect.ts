import HttpError from "../error";
import {UserFindById} from "../models/user/user";
import {LoadSession} from "../models/session/session";
import {ISession, IUserSession} from "../routes/typings";
import {IHandshake, ISocket} from "./socket.typings";

const cookie = require('cookie');
const async = require('async');
const config = require('../../config.json');
const cookieParser = require('cookie-parser');

export function socketCheckAuth(handshake: IHandshake, mainCallback: (e: Event | Error | null, check?: boolean) => void) {
    async.waterfall([
        function (callback: (e: Event | null) => void) {
            handshake.cookies = cookie.parse(handshake.headers.cookie || '');
            const sidCookie = handshake.cookies[config.session.key];
            const sid = cookieParser.signedCookie(sidCookie, config.session.secret);
            loadSession(sid, callback);
        },
        function (session: ISession, callback: (e: Event | Error | null) => void) {
            if (session === null || !session) callback(new Error("No session"));
            else {
                handshake.session = session;
                loadUser(session, callback);
            }
        },
        function (user: IUserSession, callback: (e: Event | Error | null) => void) {
            if (!user) callback(new Error("Anonymous session may not connect"));
            else {
                handshake.user = user;
                callback(null);
            }
        }

    ], function (err: Error) {
        if (!err) return mainCallback(null, true);
        else {
            if (err.name === 'HttpError') return mainCallback(null, false);
            else mainCallback(err);
        }
    });
}

export const socketSessionReload = (io: any) => (sid: string) => {
    const clients = io.sockets.clients();
    clients.forEach(function (client: ISocket) {
        if (client.handshake.session.id !== sid) return;
        loadSession(sid, function (err, session) {
            if (err) {
                client.emit("error", "server error");
                client.disconnect();
                return;
            }
            if (!session) {
                client.emit("logout");
                client.disconnect();
                return;
            }
            client.handshake.session = session;
        });

    });
};

function loadSession(sid: string, callback: (e: Event | null, session?: ISession | null) => void) {
    LoadSession(sid)
        .then((session: any) => {
            return callback(null, session);
        })
        .catch(() => {
            callback(null, null);
        })
}

function loadUser(session: ISession, callback: (e: Event | Error | null, user?: IUserSession | null) => void) {
    if (!session.user) {
        callback(null, null);
    }
    else {
        UserFindById(session.user.id)
            .then((user: IUserSession) => {
                callback(null, user);
            })
            .catch((err: HttpError) => {
                callback(err);
            });
    }
}
