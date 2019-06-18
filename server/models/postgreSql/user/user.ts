import {HttpError} from "../base";
import {encriptString} from "../../crypto";
import {IUser} from "../../../../src/reducers/User/User.typings";
import {psqlPromise} from "../utils";

export function UserRegister(nick: string, email: string, password: string) {
    return new Promise(async (resolve: (user: IUser) => void, reject: (err: HttpError) => void) => {
        try {
            await psqlPromise(`insert into users (nick, email, hashed_password, salt) values ('${nick}', '${email}', '${encriptString(password)}', 'n');`);

            const {rows} = await psqlPromise(`select * from users where email = '${email}'`);

            if (rows.length > 0) {
                resolve(rows[0]);
            } else {
                reject(new HttpError('User not Created'));
            }

        } catch (err) {
            if (err.constraint === 'users_email_key') {
                reject(new HttpError('Duplicate Email', err.status));
            } else {
                console.log(err);
                reject(new HttpError('Error UserRegister', err.status));
            }
        }
    });
}

export function UserAuthorize(email: string, password: string) {
    return new Promise(async (resolve: (user: IUser) => void, reject: (err: HttpError) => void) => {
        try {
            const {rows} = await psqlPromise(`select * from users where email = '${email}';`);

            if (rows.length === 0) {
                reject(new HttpError('Пользователь не найден'));
            } else {
                const user = rows[0] as IUser & { hashed_password: string };

                if (user.hashed_password !== encriptString(password)) {
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
            reject(new HttpError('Error Authorize', err.status));
        }
    });
}

export function UserFindById(id: number) {
    return new Promise(async (resolve: (user: IUser) => void, reject: (err?: HttpError) => void) => {
        try {
            const {rows} = await psqlPromise(`select * from users where id = '${id}'`);

            if (rows.length > 0) {
                resolve(rows[0]);
            } else {
                reject(new HttpError('Пользователь не существует'));
            }
        } catch (err) {
            reject(new HttpError('Error UserFindById', err.status));
        }
    });
}
