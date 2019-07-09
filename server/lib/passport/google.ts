import {IUser} from "../../../src/reducers/User/User.typings";
import User from "../../models/User/user";
import {IStrategyType} from "./index";

const isDev = process.env.NODE_ENV === 'development';

const GoogleStrategy = require('passport-google-oauth2').Strategy;

const googleStrategy = new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECKRET,
        callbackURL: `http://${isDev ? `localhost:${process.env.PORT}` : process.env.HOSTNAME}/auth/google/callback`,
        passReqToCallback: true,
    },
    async (request: Request, accessToken: string, refreshToken: string, profile: any, done: (err: Error | null, data?: { user: IUser, strategy: IStrategyType }) => void) => {
        const email = profile.email;
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

export default googleStrategy;
