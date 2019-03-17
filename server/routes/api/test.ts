import * as express from 'express';
import {pool} from "../../models/postgreSql/base";


export const testRouter = (_: express.Request, res: express.Response, __: express.NextFunction) => {
    // pool.query("DELETE FROM user_invites;", (err: Error, result: any) => {
    //     console.log(result.rows);
    // });
    for (const table of ['group_users', 'users', 'user_invites']) {
        pool.query(`SELECT *FROM ${table};`, (___: Error, result: any) => {
            console.log(result.rows);
        });
    }
    res.send(JSON.stringify({testMessage: "Message"}));
};


