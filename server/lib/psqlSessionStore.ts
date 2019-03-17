import {pool} from "../models/postgreSql/base";

export const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const config = require('../../config.json');

export const sessionStore = new pgSession({
    pool,
    tableName: 'session'
});

export const sessionOptions = session({
    store: sessionStore,
    secret: config.session.secret,
    key: config.session.key,
    resave: false,
    cookie: {maxAge: config.session.cookie.maxAge} // 30 days
});
