import {HttpError, pool} from "../base";
import {IFilm, IFilmToCreate} from "../../../../src/reducers/Films/Films.typings";
import {psqlPromise} from "../utils";

const getCreateQuery = (film: IFilmToCreate) => {
    const genres = film.genres;
    const names = ['id', 'name'];
    const values = [film.id, film.name];
    if (film.date) {
        names.push('date');
        values.push(film.date);
    }
    if (film.studio) {
        names.push('studio');
        values.push(film.studio);
    }
    if (film.preview) {
        names.push('preview');
        values.push(film.preview);
    }

    let genresQuery = "INSERT INTO films_genres (film_id, name) values ";

    try {
        for (let i = 0; i < genres.length; i++) {
            genresQuery += `((SELECT id FROM rows), '${genres[i]}')${i === genres.length - 1 ? '' : ', '}`;
        }
        genresQuery += 'returning id';
    } catch (e) {
        genresQuery = ''
    }

    return {
        values, text: `
${genres.length > 0 ? 'with rows as (' : ''}
    INSERT INTO films (${names}) 
    VALUES (${values.map((_, i) => `$${i + 1}`).join(',')}) returning id 
${genres.length > 0 ? ') ' + genresQuery : ''}
`
    }
};

export function CreateFilm(film: IFilmToCreate) {
    return new Promise(async (resolve: (film: IFilm) => void, reject: (err: HttpError) => void) => {
        try {
            const query = getCreateQuery(film);
            const response = await psqlPromise(query);

            if (response.rows.length > 0) {
                const resultFilm = {
                    ...film,
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
        }
    });
}