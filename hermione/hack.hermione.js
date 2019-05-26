const fs = require("fs");

const arr = require('./list.json');
const films = [];
let current;

for (const name of arr) {
    it('Download ' + name, function () {
        current = {};

        return this.browser
            .url(`https://www.google.com/search?q=трейлер к фильму ${name}`)
            .getText('.zloOqf')
            .then(function (list) {
                const hash = {};

                for (const v of list) {
                    const sp = v.split(': ');
                    hash[sp[0]] = sp[1];
                }

                const rawDate = hash['Дата премьеры'].split(' г.')[0];
                const [day, _month, year] = rawDate.split(' ');
                const month = ['января', 'ферваля', 'марта', 'арпеля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'].indexOf(_month);

                if (month !== -1)
                    current.date = `${year}-${month + 1}-${day}`;
            })

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

            .getText('.FGpTBd .iUh30')
            .then(function (text) {
                current.trailer_id = text.split('v=')[1];
            })

            .url(`https://www.google.com/search?tbm=isch&q=фильм ${name}`)
            .click('#rg .rg_bx > a')
            .pause(3000)
            .selectorExecute('#irc_cc > div[style*="visible"] .irc_mi', function (list) {
                return list.map(el => ({src: el.src, w: el.width})).sort((a, b) => a.w - b.w).slice(0, 1)[0].src;
            })
            .then(function (data) {
                films.push({
                    ...current,
                    name,
                    image_src: data
                });

                if (name === arr[arr.length - 1]) {
                    fs.writeFile(`dist/films.json`, JSON.stringify(films));
                }
            })
    });
}




