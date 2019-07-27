import {IUser} from "../../../src/reducers/User/User.typings";
import HttpError from "../../error";
import {psqlPromise} from "../models.utils/promise";

function Find({value, column}: { value: string, column?: 'id' | 'email' }) {
    return new Promise(async (resolve: (user: IUser) => void, reject: (err?: HttpError) => void) => {
        try {
            const {rows} = await psqlPromise(`select * from users where ${column || 'id'} = '${value}'`);

            if (rows.length > 0) {
                resolve(rows[0]);
            } else {
                reject(new HttpError('Пользователь не существует'));
            }
        } catch (err) {
            console.log(err);
            reject(new HttpError('Error UserFindById', err.status));
        }
    });
}

export default Find;
