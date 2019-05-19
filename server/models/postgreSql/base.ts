import * as DB from "@muzikanto/pg";
import * as util from 'util';
import {Pool} from "pg";

const config = require('../../../config.json');

const pool = new Pool({
    connectionString: config.postgresSqlUrl,
    ssl: true
});
(async () => {
    const usersTable = 'users';
    const createTables = DB.getQueryCreateTables([
        {
            table: 'session',
            fields: {
                sid: 'varchar NOT NULL COLLATE "default"',
                sess: 'json NOT NULL',
                expire: 'timestamp(6) NOT NULL'
            },
            options: {
                end: 'WITH (OIDS=FALSE)',
                constraints: {session_pkey: 'PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE'}
            }
        },
        {
            table: usersTable,
            fields: {
                id: 'SERIAL PRIMARY KEY',
                nick: 'varchar(50) NOT NULL',
                email: 'varchar(30) NOT NULL UNIQUE',
                hashed_password: 'varchar(50) NOT NULL',
                salt: 'varchar(50) NOT NULL',
                created: 'timestamp DEFAULT CURRENT_TIMESTAMP'
            }
        }
    ]);
    try {
        await DB.psqlPromise(pool, createTables);
    } catch (err) {
        console.log(err);
    }
    await DB.psqlPromise(pool, DB.getQueryShowAllTables());
})();

interface IAuthError extends Event {
    message: string;
}

const authError = function (this: IAuthError, message: string) {
    Error.apply(this, arguments as any);
    Error.captureStackTrace(this, authError);
    this.message = message;
} as any as new (message: string) => IAuthError;
util.inherits(authError, Error);
authError.prototype.name = 'authError';

export {
    pool,
    authError,
    IAuthError
};
