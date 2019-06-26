import {Pool} from "pg";

const pool = new Pool({
    connectionString: process.env.POSTGRESQL_SSH,
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

    // const add = 'alter table users add column google_id varchar(30);';

    return session + users + films + films_genres + user_films;
}

pool.query(getQuery(), (err: Error) => {
    err && console.log(err);
});

export {
    pool,
};
