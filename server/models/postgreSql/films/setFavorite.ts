import {HttpError,  pool} from "../base";
import {psqlPromise} from "../utils";
import {IUser} from "../../../../src/reducers/User/User.typings";
import {IfavoriteFilmRouterQuery} from "../../../routes/Films/favorite";

function getUpdateQuery(data: IfavoriteFilmRouterQuery, user: IUser) {
    return `
WITH upsert AS (
    UPDATE films_user 
    SET is_favorite=${data.is_favorite} 
    WHERE film_id=${data.id} and user_id=${user.id} 
    RETURNING *
)
INSERT INTO films_user (film_id, user_id, is_favorite) 
SELECT ${data.id}, ${user.id}, ${data.is_favorite} WHERE NOT EXISTS (SELECT * FROM upsert)
`;
}

export function FavoriteFilm(data: IfavoriteFilmRouterQuery, user: IUser) {
    return new Promise(async (resolve: () => void, reject: (err: HttpError) => void) => {
        try {
            await psqlPromise(pool, getUpdateQuery(data, user));
            resolve();
        } catch (err) {
            reject(new HttpError('No set favorite'));
        }
    });
}