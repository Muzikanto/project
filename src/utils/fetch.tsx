interface IfetchData{
    response:{[key:string]:any};
    status:number;
    message:string;
}

export function postFetch(url: string, body?: { [key: string]: any }):Promise<IfetchData> {
    return fetch(url, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(body)
    }).then(data => data.json())
}


export function getFetch(url: string, params: { [key: string]: any } = {}):Promise<IfetchData> {
    return fetch(Object.keys(params).reduce((acc: any, key: string) => {
        return acc + `${key}=${params[key]}&`;
    }, url + '?'), {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(data => data.json())
}
