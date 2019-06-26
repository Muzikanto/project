import HttpError from "../../error";
import {IUser} from "../../../src/reducers/User/User.typings";
import {psqlPromise} from "../utils/promise";
import {decriptString, generatePassword, hashedPassword} from "../../lib/password";
import SendMail from "../../mailer";
import {IUserModel} from "./index";

function Create({nick, email, password}: { nick: string, email: string, password: string }) {
    return new Promise(async (resolve: (user: IUserModel) => void, reject: (err: HttpError) => void) => {
        const {hashed_password, salt} = hashedPassword(password);
        try {
            await psqlPromise(`insert into users (nick,email,hashed_password,salt) values ('${nick}', '${email}', '${hashed_password}','${salt}');`);

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

function Auth({email, password}: { email: string, password: string }) {
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

function FindOrCrate(find: { value: string, column?: 'id' | 'email' }, create: { nick: string, email: string }) {
    return new Promise(async (resolve: (user: IUser) => void, reject: (err?: HttpError) => void) => {
        try {
            const user = await User.Find(find);

            resolve(user);
        } catch (e) {
            try {
                const {
                    hashed_password,
                    email, id, salt, nick,
                } = await User.Create({...create, password: generatePassword()});

                SendMail.SendPassword({nick, email, id, password: decriptString(hashed_password, salt), token: 'token'}).then().catch();

                resolve({id, email, nick});
            } catch (e) {
                reject(new HttpError('Error FindOrCreate'));
            }
        }
    })
}

const User = {
    Create,
    Auth,
    Find,
    FindOrCrate,
};

export default User;
