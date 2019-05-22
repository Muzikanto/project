export function parseDate(d: string) {
    const arr = d.split('-');

    return `${arr[2]} ${nameMonth(Number(arr[1]) - 1)} ${arr[0]}`;
}

export function nameMonth(v: number) {
    return ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'][v];
}

export function dateToSqlFormat(date: Date) {
    return date.getUTCFullYear() + "-" + date.getUTCMonth() + "-" + date.getUTCDate();
}