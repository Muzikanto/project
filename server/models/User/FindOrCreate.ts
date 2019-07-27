import {IUser} from "../../../src/reducers/User/User.typings";
import HttpError from "../../error";
import {decriptString, generatePassword} from "../../lib/password";
import SendMail from "../../mailer";
import User from ".";

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

export default FindOrCrate;
