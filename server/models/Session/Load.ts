import {IUserSession} from "../../routes/typings";
import {psqlPromise} from "../models.utils/promise";

export function Load(sid: string) {
    return new Promise(async (resolve: (user: IUserSession | null) => void) => {
        try {
            const {rows} = await psqlPromise(`select sess from session where sid = '${sid}'`);

            if (rows.length > 0)
                resolve(rows[0].sess);
            else
                resolve(null);
        } catch (err) {
            console.log(err);
        }
    });
}
