import {IObjectStr} from "./typings";
import {historyState} from "../history";

export function historyPush(data: IObjectStr) {
    const {pathname, search} = historyState.location;
    const vars = search ? pushToObj(search, data) : '?' + objectToQuery(data);

    historyState.push(`${pathname}${vars}`);
}

function pushToObj(str: string, data: IObjectStr): string {
    return '?' + objectToQuery({
        ...queryToObject(str),
        ...data,
    })
}

export function queryToObject(str: string):IObjectStr {
    return str
        .slice(1)
        .split('&')
        .reduce((acc: IObjectStr, el) => {
            const [k, v] = el.split('=');
            acc[k] = v;

            return acc;
        }, {});
}

export function objectToQuery(data: IObjectStr) {
    return Object.keys(data).map(key => `${key}=${data[key]}`).join('&');
}