import {HttpError,  pool} from "../base";
import {IFilm, IFilmToCreate} from "../../../../src/reducers/Films/Films.typings";
import {psqlPromise} from "../utils";

const getCreateQuery = (values: any[], genres: string[]) => {
    let genresQuery = "INSERT INTO films_genres (film_id, name) values ";

    for(let i = 0; i < genres.length; i++) {
        genresQuery += `((SELECT id FROM rows), '${genres[i]}')${i === genres.length - 1 ? '' : ', '}`;
    }
    genresQuery += 'returning id';

    return {values, text: `
${genres.length > 0 ? 'with rows as (' : ''}    
    INSERT INTO films (name, avatar, date, image_src,  trailer_id) 
    VALUES ($1, $2, $3, $4, $5) returning id 
${genres.length > 0 ? ') ' + genresQuery : ''}
`
}
};

export function CreateFilm(film: IFilmToCreate) {
    return new Promise(async (resolve: (film: IFilm) => void, reject: (err: HttpError) => void) => {
        try {
            const query = getCreateQuery([
                film.name, film.avatar, film.date, film.image_src, film.trailer_id
            ], film.genres);
            const response = await psqlPromise(pool, query);

            if (response.rows.length > 0) {
                const resultFilm = {
                    ...film,
                    id: response.rows[0].id,
                    stars: 5,
                } as IFilm;

                resolve(resultFilm);
            } else {
                reject(new HttpError('Film not Created'));
            }
        } catch (err) {
            if (err.constraint === 'films_name_key') {
                reject(new HttpError('Duplicate Names'));
            } else {
                reject(new HttpError('Error Create'));
            }
            console.log(err)
        }
    });
}