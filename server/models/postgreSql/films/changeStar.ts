import {authError, IAuthError, pool} from "../base";
import {psqlPromise} from "../utils";
import {IchangeStarsFilmRouterQuery} from "../../../routes/Films/changeStars";

function getUpdateQuery() {
    return `
UPDATE films
SET stars = (stars + $1) / 2, stars_users = stars_users + 1
WHERE id = $2;
insert into films_user (film_id, user_id, set_star) values ($1, $2, true);
commit;
`;
}

export function ChangeFilmStars(data: IchangeStarsFilmRouterQuery) {
    return new Promise(async (resolve: () => void, reject: (err: IAuthError) => void) => {
        try {
            const filmsRows = await psqlPromise(pool, {
                text: getUpdateQuery(),
                values: [data.stars, data.id]
            });

            if (filmsRows.rowCount > 0) {
                resolve();
            } else {
                reject(new authError('No Update film'));
            }
        } catch (err) {
            console.log(err);
            reject(new authError('Error Films Change'));
        }
    });
}