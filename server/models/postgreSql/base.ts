import * as util from 'util';
import {Pool} from "pg";
import {psqlPromise} from "./utils";
import {SaveFilmsToJSON, LoadFilmsFromJSON} from "./save";

const config = require('../../../config.json');
const pool = new Pool({
    connectionString: config.postgresSqlUrl,
    ssl: true
});

// SaveFilmsToJSON();
// LoadFilmsFromJSON();

const session =
`
create table if not exists session (
    sid varchar NOT NULL COLLATE "default",
    sess json NOT NULL,
    expire timestamp(6) NOT NULL
);
`;

const films =
`
create table if not exists films (
    id serial primary key,
    name varchar(50) NOT NULL UNIQUE,
    avatar varchar(10),
    date Date,
    image_src varchar(100),
    stars bigint default 5,
    stars_users bigint default 0,
    trailer_id varchar(20),
    created timestamp default current_timestamp
);
`;

const films_genres =
`
create table if not exists films_genres (
    id serial primary key,
    name varchar(50) NOT NULL,
    film_id bigint,
    FOREIGN KEY (film_id) REFERENCES films(id) ON DELETE CASCADE,
    unique (name, film_id)
);
`;

const users =
`
create table if not exists users (
    id SERIAL PRIMARY KEY,
    nick varchar(50) NOT NULL,
    email varchar(30) NOT NULL UNIQUE,
    hashed_password varchar(50) NOT NULL,
    salt varchar(50) NOT NULL,
    created timestamp DEFAULT CURRENT_TIMESTAMP
);
`;

const user_films =
`
create table if not exists films_user (
    id serial primary key,
    is_favorite boolean,
    set_star boolean,
    film_id bigint,
    FOREIGN KEY (film_id) REFERENCES films(id) ON DELETE CASCADE,
    user_id bigint,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;

(async () => {
    try {
        await psqlPromise(pool, session + users + films + films_genres + user_films);
    } catch (err) {
        console.log('Error Create Tables', err);
    }
})();

interface IAuthError extends Event {
    message: string;
}

// Need Refac
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
