export function parseDate(d: string) {
    const date = new Date(d);

    return `${date.getDate()} ${nameMonth(date.getMonth())} ${date.getFullYear()}`;
}

export function nameMonth(v: number) {
    return ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'][v];
}

export function dateToSqlFormat(date: Date) {
    return date.getUTCFullYear() + "-" + date.getUTCMonth() + "-" + date.getUTCDate();
}