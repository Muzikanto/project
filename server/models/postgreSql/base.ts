import {Pool} from "pg";
import {psqlPromise} from "./utils";
import {LoadFilmsFromJSON} from "./save";


const config = require('../../../config.json');
const pool = new Pool({
    connectionString: config.postgresSqlUrl,
    ssl: true
});

function getQuery() {
    const session = `
        create table if not exists session (
            sid varchar NOT NULL COLLATE "default",
            sess json NOT NULL,
            expire timestamp(6) NOT NULL
        );
    `;

    const films = `
        create table if not exists films (
            id serial primary key,
            name varchar(50) NOT NULL UNIQUE,
            studio varchar(50),
            date Date,
            preview varchar(100),
            stars float default 5,
            stars_users bigint default 0
        );
    `;

    const films_genres = `
        create table if not exists films_genres (
            id serial primary key,
            name varchar(50) NOT NULL,
            film_id bigint NOT NULL,
            FOREIGN KEY (film_id) REFERENCES films(id) ON DELETE CASCADE,
            unique (name, film_id)
        );
    `;

    const users = `
        create table if not exists users (
            id SERIAL PRIMARY KEY,
            nick varchar(50) NOT NULL,
            email varchar(30) NOT NULL UNIQUE,
            hashed_password varchar(50) NOT NULL,
            salt varchar(50) NOT NULL,
            created timestamp DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const user_films = `
        create table if not exists films_user (
            id serial primary key,
            is_favorite boolean,
            set_star boolean,
            film_id bigint,
            FOREIGN KEY (film_id) REFERENCES films(id) ON DELETE CASCADE,
            user_id bigint,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            CONSTRAINT unique_film_user UNIQUE (film_id,user_id)
        );
    `;

    // const add ='alter table films add column description varchar(1500);';

    return session + users + films + films_genres + user_films;
}


(async () => {
    try {
        await psqlPromise(getQuery());
    } catch (err) {
        console.log('Error Create Tables', err);
    }
})();

class HttpError {
    public status: number;
    public name = 'HttpError';
    public message: string;

    constructor(message: string, status: number = 403) {
        Error.apply(this, [message]);
        Error.captureStackTrace(this, this.constructor);
        this.status = status;
        this.message = message;
    }
}

// SaveFilmsToJSON('./dist/films.json').then();

export {
    pool,
    HttpError
};
