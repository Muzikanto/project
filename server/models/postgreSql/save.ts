import JSONReader from "../../utils/Reader/_json/JSONReader";
import {CreateFilm} from "./films/create";
import moonRequest from "../../routes/Films/utils/moonwalkRequest";

const filmReader = new JSONReader({pathToData: ''});

export const LoadFilmsFromJSON = async (path: string) => {
    const films = filmReader.read(path) as Array<{ name: string, id: string, date: string }>;

    for (const v of films) {
        try {
            const {kinopoisk_id, title_ru, material_data: {genres, poster, studios}} = await moonRequest(v.id);

            await CreateFilm({
                id: kinopoisk_id,
                studio: studios[0],
                name: title_ru,
                date: v.date,
                genres,
                preview: poster,
            });
        } catch (e) {
            if (e.message !== 'Duplicate Names')
            console.log(v.name, e.message);
        }
    }
};
