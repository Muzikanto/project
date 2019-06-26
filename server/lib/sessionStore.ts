import {pool} from "../models";

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const sessionStore = new pgSession({
    pool,
    tableName: 'session'
});

export default session({
    store: sessionStore,
    secret: process.env.SESSION_COOKIE_SECRET,
    key: process.env.SESSION_COOKIE_KEY,
    resave: false,
    cookie: {maxAge: process.env.SESSION_MAX_AGE} // 603600000 -> 30 days
});
