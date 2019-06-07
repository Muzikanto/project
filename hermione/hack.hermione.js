const fs = require("fs");

const names = require('./list.json');
const arr = require('./films.json').map(el => el.name);
const data = [];
let current;

const arrToLoad = names.filter(n => arr.indexOf(n) === -1);
arrToLoad.forEach((name, i) => {
    it('Download ' + name, function () {
        current = {};

        return this.browser
            .url(`https://www.kinopoisk.ru/index.php?kp_query=${name}`)
            .click('.block_left_pad > .search_results:nth-child(3) .flap_img')

            // Image
            .selectorExecute('.popupBigImage > img', function (list) {
                return list.map(el => el.src)[0];
            })
            .then(function (url) {
                current.image_src = url;
            })

            // Content
            .selectorExecute('#photoInfoTable table.info tbody > tr', function (list) {
                return list.map(el => el.innerText);
            })
            .then(function (list) {
                const data = list.reduce((acc, el) => {
                    let split = el.split('\t');
                    acc[split[0]] = split[1];
                    return acc;
                }, {});

                current = {
                    ...current,
                    date: parseDate(data['премьера (мир)']),
                    genres: parseGenres(data['жанр']),
                }
            })

            // Description
            .getText('.brand_words.film-synopsys')
            .then(function (text) {
                current.description = text;
            })

            // Trailer
            .then(loadTrailer.bind(this.browser, name))

            .pause(0)
            .then(function () {
                data.push({
                    ...current,
                    name,
                });

                if (i >= arrToLoad.length - 1 || i % 10 === 0) {
                    fs.writeFile(`./hermione/films.json`, JSON.stringify(data));
                }
            })
    });
});


function parseDate(str) {
    const raw = str.slice(1, str.indexOf(',')).split(' ');
    const months = ['января', 'ферваля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    return `${raw[2]}-${months.indexOf(raw[1]) + 1}-${raw[0]}`
}

function parseGenres(str) {
    return str.split(', ').slice(1, -1);
}

function loadTrailer(name) {
    return this
        .url(`https://www.google.com/search?q=трейлер к фильму ${name}`)
        .isExisting('.FGpTBd .iUh30')
        .then(function (exists) {
            if (exists) {
                return this
                    .getText('.FGpTBd .iUh30')
                    .then(function (text) {
                        current.trailer_id = text.split('v=')[1];
                    })
            } else {
                return this
                    .isExisting('.iUh30')
                    .then(function (exists1) {
                        if (exists1) {
                            return this
                                .getText('.iUh30')
                                .then(function (text) {
                                    current.trailer_id = text[1].split('v=')[1];
                                });
                        } else {
                            return true;
                        }
                    }.bind(this));
            }
        })
}