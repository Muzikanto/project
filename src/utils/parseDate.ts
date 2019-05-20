export function parseDate(v: number) {
    const d = new Date(v);

    return `${d.getDate()} ${nameMonth(d.getMonth())} ${d.getFullYear()}`
}

export function nameMonth(v: number) {
    return ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'][v];
}