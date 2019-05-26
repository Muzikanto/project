const fs = require("fs");

const arr = require('./list.json');

arr.sort(function (a, b) {
    return a.localeCompare(b);
});

const hash = {};

for (const v of arr) {
    if (!hash[v])
        hash[v] = true;
}

fs.writeFile(`hermione/list.json`, JSON.stringify(arr.filter(el => hash[el])), () => {});
