import HttpError from "../../error";
import {psqlPromise} from "../models.utils/promise";
import {IUser} from "../../../src/reducers/User/User.typings";
import {IFilmTypings} from "../../routes/Films/Films.typings";

function getQuery(data: IFilmTypings.setStarQuery, user: IUser) {
    return `
UPDATE films
SET stars = (stars + ${data.stars}) / 2, stars_users = stars_users + 1
WHERE id = ${data.id};
WITH upsert AS (
    UPDATE films_user 
    SET set_star=true 
    WHERE film_id=${data.id} and user_id=${user.id} 
    RETURNING *
    )
INSERT INTO films_user (film_id, user_id, set_star) 
SELECT ${data.id}, ${user.id}, true WHERE NOT EXISTS (SELECT * FROM upsert);
commit;
`;
}

export function SetStar(data: IFilmTypings.setStarQuery, user: IUser) {
    return new Promise(async (resolve: () => void, reject: (err: HttpError) => void) => {
        try {
            await psqlPromise(getQuery(data, user));
            resolve();
        } catch (err) {
            console.log(err);
            reject(new HttpError('Not Change Star'));
        }
    });
}
