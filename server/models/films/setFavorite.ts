import HttpError from "../../error";
import {psqlPromise} from "../utils/promise";
import {IUser} from "../../../src/reducers/User/User.typings";
import {IfavoriteFilmRouterQuery} from "../../routes/Films/setFavorite";

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
            await psqlPromise(getUpdateQuery(data, user));
            resolve();
        } catch (err) {
            reject(new HttpError('No set favorite'));
        }
    });
}
