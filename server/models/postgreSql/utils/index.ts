function psqlPromise(pool: any, query: string | { text: string, values: any[] }): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
        pool.query(query, (err: Error, result: any) => {
            if (err)
                reject(err);
            else
                resolve(result);
        });
    });
}

export {
    psqlPromise,
}
