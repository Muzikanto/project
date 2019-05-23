import {authError, IAuthError, pool} from "../base";
import {IFilm} from "../../../../src/reducers/Films/Films.typings";
import {psqlPromise} from "../utils";

function getUpdateQuery() {
    return `
UPDATE films
SET name = $1, avatar = $2, date = $3, image_src = $4, trailer_id = $5
WHERE id = $6;
`;
}

export function ChangeFilm(film: IFilm) {
    return new Promise(async (resolve: () => void, reject: (err: IAuthError) => void) => {
        try {
            const filmsRows = await psqlPromise(pool, {
                text: getUpdateQuery(),
                values: [film.name, film.avatar, film.date, film.image_src, film.trailer_id, film.id]
            });

            if (filmsRows.rowCount > 0) {
                resolve();
            } else {
                reject(new authError('No Update film'));
            }

        } catch (err) {
            console.log(err);
            reject(new authError('Error Films Select'));
        }
    });
}