import HttpError from "../../error";
import {IFilmTypings} from "../../../src/reducers/Films/Films.typings";
import {psqlPromise} from "../models.utils/promise";

function getUpdateQuery() {
    return `
UPDATE films
SET name = $1, studio = $2, date = $3, preview = $4 
WHERE id = $5;
`;
}

export function Change(film: IFilmTypings.Item) {
    return new Promise(async (resolve: () => void, reject: (err: HttpError) => void) => {
        try {
            await psqlPromise({
                text: getUpdateQuery(),
                values: [film.name, film.studio, film.date, film.preview,  film.id]
            });

            resolve();
        } catch (err) {
            console.log(err);
            reject(new HttpError('Not Change Film'));
        }
    });
}
