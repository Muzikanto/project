import {IObject} from "./typings";

export function deepCopy(data: any): any {
    if(typeof data === 'object') {
        if (Array.isArray(data)) {
            return [...data.map((el)=> deepCopy(el))];
        } else {
            const obj: IObject = {};

            for(const key in data) {
                obj[key] = deepCopy(data[key]);
            }

            return obj;
        }
    } else {
        return data;
    }
}
