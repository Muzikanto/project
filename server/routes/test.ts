import * as express from 'express';
// import {pool} from "../models/postgreSql/base";

export const testRouter = (_: express.Request, res: express.Response, __: express.NextFunction) => {
    // for (const table of ['users']) {
    //     pool.query(`SELECT *FROM ${table};`, (___: Error, result: any) => {
    //         console.log(result.rows);
    //     });
    // }
    res.send(JSON.stringify({testMessage: "Message"}));
};
