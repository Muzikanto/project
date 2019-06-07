import {pool, HttpError} from "../base";
import {IFilm} from "../../../../src/reducers/Films/Films.typings";
import {IselectFilmsRouterQuery} from "../../../routes/Films/select";
import {psqlPromise} from "../utils";
import {IUserSession} from "../../../routes/typings";

function getSelectQuery(filters: IselectFilmsRouterQuery, user: IUserSession | null) {
    let genres = filters.filter_genres ?
        filters.filter_genres.split(',').map(el => `'${el}'`).join(',') : '';

    return `
WITH list_films AS 
    ( 
        select fg.film_id as film_id, array_agg(fg.name) as name
        from films_genres as fg 
        ${genres ? `where fg.name in (${genres}) ` : ''}
        group by fg.film_id
    )
select f.id,f.avatar,f.created,f.date,f.image_src,f.name,f.stars,f.trailer_id,f.stars_users,
${user ? 'fu.set_star as set_star, fu.is_favorite as is_favorite,' : ''}
(select fl.name from list_films as fl where fl.film_id = f.id) as genres
from films as f 
${user ? `left join films_user as fu on fu.user_id = ${user.id} and fu.film_id = f.id` : ''} 
where f.id in (select film_id from list_films) 
${filters.input ? `and f.name like '%${filters.input}%'` : ''} 
${filters.filter_dates ? `and date_part('year', f.date) in (${filters.filter_dates})` : ''} 
${filters.filter_stars ? `and f.stars >= ${filters.filter_stars}` : ''} 
order by ${filters.filter_sort === 'star' ? 'f.stars' : 'f.date'} desc nulls last 
limit 12 offset ${(Number(filters.page) || 0) * 12}
`;
}

export function SelectFilms(filters: IselectFilmsRouterQuery, user: IUserSession | null, input?: string) {
    return new Promise(async (resolve: (films: IFilm[]) => void, reject: (err: HttpError) => void) => {
        try {
            const query = getSelectQuery(filters, user);
            const filmsRows = await psqlPromise(pool, query);

            resolve(filmsRows.rows);
        } catch (err) {
            console.log(err);
            reject(new HttpError('Error Select Films'));
        }
    });
}
