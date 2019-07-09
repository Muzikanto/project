import HttpError from "../../error";
import {IUser} from "../../../src/reducers/User/User.typings";
import {IStrategyType} from "./index";
import User from "../../models/User/user";

const isDev = process.env.NODE_ENV === 'development';

const YandexStrategy = require('passport-yandex').Strategy;

const yandexStrategy = new YandexStrategy({
        clientID: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECKRET,
        callbackURL: `http://${isDev ? `localhost:${process.env.PORT}` : process.env.HOSTNAME}/auth/yandex/callback`,
    },
    async (accessToken: string, refreshToken: string, profile: any, done: (err: HttpError | null, data?: { user: IUser, strategy: IStrategyType }) => void) => {
        const email = profile.emails[0].value;
        const nick = profile.displayName;

        try {
            const user = await User.FindOrCrate(
                {value: email, column: 'email'},
                {nick, email}
            );

            done(null, {user, strategy: 'custom'});
        } catch (err) {
            console.log(err);
            return done(err);
        }
    }
);

export default yandexStrategy;
