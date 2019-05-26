import JSONReader from "../../utils/Reader/_json/JSONReader";
import {SelectFilms} from "./films/select";
import {IFilm, IFilmToCreate} from "../../../src/reducers/Films/Films.typings";
import {CreateFilm} from "./films/create";
import {prepareFilms} from "../../../src/reducers/Films/Films.helpers";

const filmReader = new JSONReader({pathToData: ''});

export const SaveFilmsToJSON = (path: string) =>
    SelectFilms({filter_stars: '0', filter_dates: '', filter_genres: ''})
        .then(data => {
            console.log('Save DB films to JSON');
            filmReader.write(path, data);
        });

export const LoadFilmsFromJSON = async (path: string) => {
    const films = filmReader.read(path) as IFilmToCreate[];

    for (const v of films) {
        try {
            await CreateFilm(v);
        } catch (e) {
            console.log(v.name, e);
        }
    }
};
