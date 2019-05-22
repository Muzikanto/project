import {authError, IAuthError, pool} from "../base";
import {IFilm} from "../../../../src/reducers/Films/Films.typings";
import {psqlPromise} from "../utils";

const getCreateQuery = (values: any[], genres: string[]) => {
    let genresQuery = "INSERT INTO films_genres (film_id, name) values ";

    for(let i = 0; i < genres.length; i++) {
        genresQuery += `((SELECT id FROM rows), '${genres[i]}')${i === genres.length - 1 ? '' : ', '}`;
    }
    genresQuery += 'returning id';

    return {values, text: `
${genres.length > 0 ? 'with rows as (' : ''}    
    INSERT INTO films (name, avatar, date, image_src, stars, trailer_id) 
    VALUES ($1, $2, $3, $4, $5, $6) returning id 
${genres.length > 0 ? ') ' + genresQuery : ''}
`
}
};

export function CreateFilm(film: IFilm) {
    return new Promise(async (resolve: (film: IFilm) => void, reject: (err: IAuthError) => void) => {
        try {
            const query = getCreateQuery([
                film.name, film.avatar, film.date, film.image_src, film.stars, film.trailer_id
            ], film.genres);
            const response = await psqlPromise(pool, query);

            if (response.rows.length > 0) {
                const resultFilm = {
                    ...film,
                    id: response.rows[0].id,
                } as IFilm;

                resolve(resultFilm);
            } else {
                reject(new authError('Film not Created'));
            }
        } catch (err) {
            if (err.constraint === 'films_name_key') {
                reject(new authError('Error duplicate Name'));
            } else {
                reject(new authError('Error FilmCreate'));
            }
            console.log(err)
        }
    });
}