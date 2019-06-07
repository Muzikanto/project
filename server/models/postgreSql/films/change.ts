import {HttpError, pool} from "../base";
import {IFilmFull} from "../../../../src/reducers/Films/Films.typings";
import {psqlPromise} from "../utils";

function getUpdateQuery() {
    return `
UPDATE films
SET name = $1, avatar = $2, date = $3, image_src = $4, trailer_id = $5
WHERE id = $6;
`;
}

export function ChangeFilm(film: IFilmFull) {
    return new Promise(async (resolve: () => void, reject: (err: HttpError) => void) => {
        try {
            await psqlPromise(pool, {
                text: getUpdateQuery(),
                values: [film.name, film.avatar, film.date, film.image_src, film.trailer_id, film.id]
            });

            resolve();
        } catch (err) {
            reject(new HttpError('Not Change Film'));
        }
    });
}