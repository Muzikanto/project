import {IUser} from "../../src/reducers/User/User.typings";
import HttpError from "../error";
import {PassportStatic} from "passport";
import User from "../models/user/user";

const LocalStrategy = require('passport-local').Strategy;

function connectStrategy(passport: PassportStatic) {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        (email: string, password: string, done: (err: Error | null, user?: IUser) => void) => {
            User.Auth(email, password).then((user: IUser) => {
                done(null, user)
            }).catch((err: HttpError) => {
                done(err);
            })
        }
    ));

    passport.serializeUser((user: IUser, done: any) => {
        done(null, user.id);
    });

    passport.deserializeUser((id: string, done: (err: Error | null, user?: IUser) => void) => {
        User.Find(id).then((user: IUser) => {
            done(null, user);
        }).catch((err: HttpError) => {
            done(err);
        });
    });
}

export {
    connectStrategy
};
