import {authError, IAuthError, pool} from "../base";
import {IFilm} from "../../../../src/reducers/Films/Films.typings";
import {psqlPromise} from "../utils";
import {IchangeStarsFilmRouterQuery} from "../../../routes/Films/changeStars";

function getUpdateQuery() {
    return `
UPDATE films
SET stars = $1
WHERE id = $2;
`;
}

export function ChangeFilmStars(data: IchangeStarsFilmRouterQuery) {
    return new Promise(async (resolve: () => void, reject: (err: IAuthError) => void) => {
        try {
            const filmsRows = await psqlPromise(pool, {
                text: getUpdateQuery(),
                values: [data.stars, data.id]
            });

            console.log(filmsRows)
        } catch (err) {
            console.log(err);
            reject(new authError('Error Films Change'));
        }
    });
}