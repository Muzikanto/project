import HttpError from "../../error";
import {psqlPromise} from "../utils/promise";
import {IchangeStarsFilmRouterQuery} from "../../routes/Films/setStar";
import {IUser} from "../../../src/reducers/User/User.typings";

function getUpdateQuery(data: IchangeStarsFilmRouterQuery, user: IUser) {
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

export function ChangeFilmStars(data: IchangeStarsFilmRouterQuery, user: IUser) {
    return new Promise(async (resolve: () => void, reject: (err: HttpError) => void) => {
        try {
            await psqlPromise(getUpdateQuery(data, user));
            resolve();
        } catch (err) {
            console.log(err)
            reject(new HttpError('Not Change Star'));
        }
    });
}
