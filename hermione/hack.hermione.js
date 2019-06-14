const fs = require("fs");

const arr = require('./list.json');
const data = [];
let current;

// бот поиска на кинопоиске

arr.forEach((name, i) => {
    it('Download ' + name, function () {
        current = {};

        return this.browser
            .url(`https://www.kinopoisk.ru/index.php?kp_query=${name}`)
            .getAttribute('.block_left_pad > .search_results:nth-child(3) .pic > a', 'href')
            .then(function (url) {
                current = {name, id: url.split('/')[6]}
            })
            .click('.block_left_pad > .search_results:nth-child(3) .flap_img')

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
                }
            })
            .then(function () {
                data.push(current);
                if (i % 10 === 0 || i === arr.length - 1) {
                    fs.writeFile(`./hermione/films.json`, JSON.stringify(data));
                }
            })
    });
});

function parseDate(str) {
    const raw = str.slice(1, str.indexOf(',')).split(' ');
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    return `${raw[2]}-${months.indexOf(raw[1]) + 1}-${raw[0]}`
}
