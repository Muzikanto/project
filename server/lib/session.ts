import {pool} from "../models";

const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
const sessionStore = new pgSession({
    pool,
    tableName: 'session'
});

const session =  expressSession({
    store: sessionStore,
    secret: process.env.SESSION_COOKIE_SECRET,
    key: process.env.SESSION_COOKIE_KEY,
    resave: true,
    saveUninitialized: true,
    // cookie: {
    //     maxAge: process.env.SESSION_MAX_AGE // 603600000 -> 30 days
    // },
});

export {
    session,
}

