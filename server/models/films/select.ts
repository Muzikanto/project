import HttpError from "../../error";
import {IFilm} from "../../../src/reducers/Films/Films.typings";
import {IselectFilmsRouterQuery} from "../../routes/Films/select";
import {psqlPromise} from "../utils/promise";
import {IUserSession} from "../../routes/typings";

function getSelectQuery(filters: IselectFilmsRouterQuery, user: IUserSession | null) {
    let genres = filters.genres ?
        filters.genres.split(',').map(el => `'${el}'`).join(',') : '';

    return `
WITH list_films AS 
    ( 
        select fg.film_id as film_id, array_agg(fg.name) as name
        from films_genres as fg 
        ${genres ? `where fg.name in (${genres}) ` : ''}
        group by fg.film_id
    )
select f.id,f.studio,f.date,f.preview,f.name,f.stars,f.stars_users,
${user ? 'fu.set_star as set_star, fu.is_favorite as is_favorite,' : ''}
(select fl.name from list_films as fl where fl.film_id = f.id) as genres
from films as f 
${user ? `left join films_user as fu on fu.user_id = ${user.id} and fu.film_id = f.id` : ''} 
where f.id in (select film_id from list_films) 
${filters.query ? `and f.name like '%${filters.query}%'` : ''} 
${filters.dates ? `and date_part('year', f.date) in (${filters.dates})` : ''} 
${filters.stars ? `and f.stars >= ${filters.stars}` : ''} 
order by ${filters.sort === 'star' ? 'f.stars' : 'f.date'} desc nulls last 
limit 12 offset ${(Number(filters.page) || 0) * 12}
`;
}

export function SelectFilms(filters: IselectFilmsRouterQuery, user: IUserSession | null) {
    return new Promise(async (resolve: (films: IFilm[]) => void, reject: (err: HttpError) => void) => {
        try {
            const query = getSelectQuery(filters, user);
            const filmsRows = await psqlPromise(query);

            resolve(filmsRows.rows);
        } catch (err) {
            console.log(err);
            reject(new HttpError('Error Select Films'));
        }
    });
}