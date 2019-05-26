const fs = require("fs");

const names = require('./list.json');
const arr = require('./films.json').map(el => el.name);
const films = [];
let current;

const _arr = names.filter(n => arr.indexOf(n) === -1);
_arr.forEach((name, i) => {
    it('Download ' + name, function () {
        current = {};

        return this.browser
            .url(`https://www.google.com/search?q=фильм ${name}`)
            .isExisting('.zloOqf', 'Нет даты')
            .then(loadDate.bind(this.browser))

            .isExisting('.wwUB2c', 'Нет жанров')
            .then(loadGenres.bind(this.browser))

            .url(`https://www.google.com/search?q=трейлер к фильму ${name}`)
            .isExisting('.wwUB2c', 'Нет Трейлера')
            .then(loadTrailer.bind(this.browser))

            .url(`https://www.google.com/search?tbm=isch&q=фильм ${name}`)
            .click('#rg .rg_bx > a')
            .pause(3000)
            .isExisting('#irc_cc > div[style*="visible"] .irc_mi', 'Нет картинки')
            .then(loadImage.bind(this.browser))

            .pause(100)
            .then(function () {
                films.push({
                    ...current,
                    name,
                });
                console.log(Object.keys(current));
                if (i === _arr.length - 1) {
                    fs.writeFile(`./hermione/films2.json`, JSON.stringify(films));
                }
            })
    });
});

function loadDate(exists) {
    if (exists) {
        return this
            .getText('.zloOqf')
            .then(function (list) {
                const hash = {};

                for (const v of list) {
                    const sp = v.split(': ');
                    hash[sp[0]] = sp[1];
                }

                const rawDate = (hash['Дата премьеры'] || hash['Премьера']).split(' г.')[0];
                const [day, _month, year] = rawDate.split(' ');
                const month = ['января', 'ферваля', 'марта', 'арпеля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'].indexOf(_month);

                if (month !== -1)
                    current.date = `${year}-${month + 1}-${day}`;
            })
    } else {
        return true;
    }
}

function loadGenres(exists) {
    if (exists) {
        return this
            .getText('.wwUB2c')
            .then(function (text) {
                const v = text.split('‧')[1];
                current.genres = [
                    "Фантастика",
                    "Боевик",
                    "Драма",
                    "Приключение",
                    "Мелодрамма",
                    "Фэнтези",
                    "Триллер",
                    "Детектив"
                ].filter(g => v.indexOf(g) !== -1 || v.indexOf(g.toLowerCase()) !== -1);
            })
    } else {
        return true;
    }
}

function loadTrailer(exists) {
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
}

function loadImage(exists, item = 2) {
    if (exists) {
        return this
            .selectorExecute('#irc_cc > div[style*="visible"] .irc_mi', function (list) {
                return list.map(el => ({
                    src: el.src,
                    w: el.width
                })).sort((a, b) => a.w - b.w).slice(0, 1)[0].src;
            })
            .then(function (data) {
                current.image_src = data;
            })
    } else {
        return this
            .click('#rg .rg_bx:nth-child(' + item + ') > a')
            .pause(3000)
            .isExisting('#irc_cc > div[style*="visible"] .irc_mi', 'Нет картинки')
            .then(loadImage.bind(this, item + 1))
    }
}
