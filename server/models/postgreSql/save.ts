import JSONReader from "../../utils/Reader/_json/JSONReader";
import {SelectFilms} from "./films/select";
import {IFilm} from "../../../src/reducers/Films/Films.typings";
import {CreateFilm} from "./films/create";

const filmReader = new JSONReader({pathToData: './server/resources'});

export const SaveFilmsToJSON = () =>
    SelectFilms({filter_stars: '0', filter_dates: '', filter_genres: ''})
        .then(data => {
            console.log('Save DB films to JSON');
            filmReader.write('films.json', data);
        });

export const LoadFilmsFromJSON = async () => {
    const films = filmReader.read('films.json') as IFilm[];

    for (const v of films) {
        try {
            await CreateFilm(v);
        } catch (e) {
            console.log(v.name, e);
        }
    }
};
