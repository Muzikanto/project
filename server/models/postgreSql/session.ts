import {pool} from "./base";
import * as DB from "@muzikanto/pg";
import {IUserSession} from "../../routes/interfaces";

const table = 'session';

export function LoadSession(sid: string) {
    return new Promise(async (resolve: (user: IUserSession | null) => void) => {
        try {
            const sql = DB.getParamsSelect(table, {select: ['sess']}, {sid});
            const result = await DB.psqlPromise(pool, sql);

            if (result.rows.length > 0)
                resolve(result.rows[0].sess);
            else
                resolve(null);
        } catch (err) {
            console.log(err);
        }
    });
}
