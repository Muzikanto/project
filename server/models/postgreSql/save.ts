import JSONReader from "../../utils/Reader/_json/JSONReader";
import {SelectFilms} from "./films/select";

const filmReader = new JSONReader({pathToData: './server/resources'});

export const SaveFilmsToJSON = () =>
    SelectFilms({filter_stars: '0', filter_dates: '', filter_genres: ''})
        .then(data => {
            console.log('Save DB films to JSON');
            filmReader.write('films.json', data);
        });