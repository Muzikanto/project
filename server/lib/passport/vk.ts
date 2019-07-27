import HttpError from "../../error";
import {IUser} from "../../../src/reducers/User/User.typings";
import UserModel from "../../models/User";
import {IStrategyType} from "./index";

const isDev = process.env.NODE_ENV === 'development';

const VKontakteStrategy = require('passport-vkontakte').Strategy;

const vkStrategy = new VKontakteStrategy({
        clientID: process.env.VKONTAKTE_CLIENT_ID,
        clientSecret: process.env.VKONTAKTE_CLIENT_SECRET,
        callbackURL: `http://${isDev ? `localhost:${process.env.PORT}` : process.env.HOSTNAME}/auth/vkontakte/callback`,
    },
    async (accessToken: string, refreshToken: string, params: any, profile: any, done: (err: HttpError | null, data?: {user: IUser, strategy: IStrategyType }) => void) => {
        const email = params.email;
        const nick = profile.displayName;

        try {
            const user = await UserModel.FindOrCreate(
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

export default vkStrategy;
