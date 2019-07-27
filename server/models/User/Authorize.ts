import {IUser} from "../../../src/reducers/User/User.typings";
import HttpError from "../../error";
import {psqlPromise} from "../models.utils/promise";
import {decriptString} from "../../lib/password";

function Authorize({email, password}: { email: string, password: string }) {
    return new Promise(async (resolve: (user: IUser) => void, reject: (err: HttpError) => void) => {
        try {
            const {rows} = await psqlPromise(`select * from users where email = '${email}'`);

            if (rows.length === 0) {
                reject(new HttpError('Пользователь не найден'));
            } else {
                const user = rows[0] as IUser & { hashed_password: string, salt: string };

                if (decriptString(user.hashed_password, user.salt) !== password) {
                    reject(new HttpError('Пароль неверен'));
                } else {
                    resolve({
                        id: user.id,
                        nick: user.nick,
                        email: user.email,
                    });
                }
            }
        } catch (err) {
            console.log(err);
            reject(new HttpError('Error Authorize', err.status));
        }
    });
}

export default Authorize;
