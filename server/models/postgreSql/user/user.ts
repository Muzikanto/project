import {HttpError,  pool} from "../base";
import {encriptString} from "../../crypto";
import * as DB from "@muzikanto/pg";
import {IUser} from "../../../../src/reducers/User/User.typings";

const table = 'users';

export function UserRegister(nick: string, email: string, password: string) {
    return new Promise(async (resolve: (user: IUser) => void, reject: (err: HttpError) => void) => {
        try {
            const selectQuery = DB.getParamsSelect(table, {}, {email});
            const select = await DB.psqlPromise(pool, selectQuery);
            if (select.rows.length > 0)
                reject(new HttpError('Email занят'));
            else {
                const insertQuery = DB.getParamsInsert(table, {
                    nick, email,
                    hashed_password: encriptString(password), salt: '',
                });
                await DB.psqlPromise(pool, insertQuery);
                const selectUser = DB.getParamsSelect(table, {select: ['id', 'email', 'nick']}, {
                    email,
                    nick,
                });
                const user = await DB.psqlPromise(pool, selectUser);
                if (user.rows.length > 0)
                    resolve(user.rows[0]);
                else
                    reject(new HttpError('User not Created'));
            }
        } catch (err) {
            console.log(err)
            reject(new HttpError('Error LoginPage.components'));
        }
    });
}

export function UserAuthorize(email: string, password: string) {
    return new Promise(async (resolve: (user: IUser) => void, reject: (err: HttpError) => void) => {
        try {
            const sqlFindUser = DB.getParamsSelect(table, {select: ['id', 'nick', 'hashed_password']}, {email});
            const findUser = await DB.psqlPromise(pool, sqlFindUser);
            if (findUser.rows.length === 0) {
                reject(new HttpError('Пользователь не найден'));
            } else {
                const user = findUser.rows[0] as IUser & {hashed_password:string};
                if (user.hashed_password !== encriptString(password))
                    reject(new HttpError('Пароль неверен'));
                else
                    resolve({
                        id: user.id,
                        nick: user.nick,
                        email: user.email,
                    });
            }
        } catch (err) {
            reject(new HttpError('Error Authorize'));
        }
    });
}

export function UserFindById(id: number) {
    return new Promise(async (resolve: (user: IUser) => void, reject: (err?: HttpError) => void) => {
        try {
            const selectQuery = DB.getParamsSelect(table, {}, {id});
            const select = await DB.psqlPromise(pool, selectQuery);
            if (select.rows.length > 0)
                resolve(select.rows[0]);
            else
                reject(new HttpError('Пользователь не существует'));
        } catch (err) {
            reject();
        }
    });
}
