import HttpError from "../../error";
import {hashedPassword} from "../../lib/password";
import {psqlPromise} from "../models.utils/promise";
import {IUserModel} from "./User.typings";

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

export default Create;