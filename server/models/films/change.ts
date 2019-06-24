import HttpError from "../../error";
import {IFilm} from "../../../src/reducers/Films/Films.typings";
import {psqlPromise} from "../utils/promise";

function getUpdateQuery() {
    return `
UPDATE films
SET name = $1, avatar = $2, date = $3, image_src = $4 
WHERE id = $5;
`;
}

export function ChangeFilm(film: IFilm) {
    return new Promise(async (resolve: () => void, reject: (err: HttpError) => void) => {
        try {
            await psqlPromise({
                text: getUpdateQuery(),
                values: [film.name, film.studio, film.date, film.preview,  film.id]
            });

            resolve();
        } catch (err) {
            reject(new HttpError('Not Change Film'));
        }
    });
}
