import * as config from "../../../../config.json";
import {HttpError} from "../../../models/postgreSql/base";

const request = require('request');

interface IMoonWalkFilm {
    "title_ru": string,
    "title_en": string,
    "year": number,
    "duration": null,
    "kinopoisk_id": string,
    "world_art_id": null,
    "pornolab_id": null,
    "token": string,
    "type": "movie",
    "camrip": boolean,
    "source_type": "BluRay",
    "source_quality_type": "cee",
    "instream_ads": boolean,
    "directors_version": boolean,
    "iframe_url": string,
    "trailer_token": string,
    "trailer_iframe_url": string,
    "translator": "Дубляж",
    "translator_id": number,
    "added_at": string,
    "category": null,
    "block": {
        "blocked_at": null,
        "block_ru": false,
        "block_ua": false
    },
    "material_data": {
        "updated_at": string,
        "poster": string,
        "year": number,
        "tagline": string,
        "description": string,
        "age": number,
        "countries": string[],
        "genres": string[],
        "actors": string[],
        "directors": string[],
        "studios": string[],
        "kinopoisk_rating": number,
        "kinopoisk_votes": number,
        "imdb_rating": number,
        "imdb_votes": number,
        "mpaa_rating": number,
        "mpaa_votes": number
    }
}

function moonRequest(id: string): Promise<IMoonWalkFilm> {
    return new Promise((resolve: (data: IMoonWalkFilm) => void, reject: (err: HttpError) => void) => {
            request(`http://moonwalk.cc/api/videos.json?kinopoisk_id=${id}&api_token=${config.moonwalk_token}`, function (error: Error, response: any, body: string) {
                if (error) {
                    reject(new HttpError('Err load film', 500));
                } else {
                    const parsedData = JSON.parse(body);

                    if (Array.isArray(parsedData)) {
                        resolve((parsedData as IMoonWalkFilm[]).reduce((acc, el) => {
                            return {...acc, ...el};
                        }, {} as IMoonWalkFilm));
                    } else {
                        reject(new HttpError(parsedData.error, 500));
                    }
                }
            });
        }
    )
}

export default moonRequest;