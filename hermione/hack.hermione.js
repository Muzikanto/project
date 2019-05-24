const fs = require("fs");
const arr = ['мстители 1'];

for (const v of arr) {
    it('Download ' + v, function () {
        return this.browser
            .url(`www.google.com/search?q=${v}+фильм`)
            .getText('.LrzXr.kno-fv')
            .then(function (data) {
                console.log(data)
                fs.writeFile(`hermione/films.json`, JSON.stringify(data), function (err) {
                    if (err) {
                        throw err;
                    }
                });
            })
    });
};
