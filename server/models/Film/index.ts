import {ChangeFilm} from "./change";
import {CreateFilm} from "./create";
import {SelectFilms} from "./select";
import {FavoriteFilm} from "./setFavorite";
import {ChangeFilmStars} from "./setStar";

const Film = {
    Change: ChangeFilm,
    Create: CreateFilm,
    Select: SelectFilms,
    setFavorite: FavoriteFilm,
    setStar: ChangeFilmStars,
};

export default Film;
