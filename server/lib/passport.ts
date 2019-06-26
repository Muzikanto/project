import {IUser} from "../../src/reducers/User/User.typings";
import HttpError from "../error";
import {PassportStatic} from "passport";
import User from "../models/user/user";

const isDev = process.env.NODE_ENV === 'development';

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const VKontakteStrategy = require('passport-vkontakte').Strategy;

type IStrategyType = 'local' | 'custom';

function connectStrategy(passport: PassportStatic) {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        (email: string, password: string, done: (err: Error | null, user?: IUser & { strategy: IStrategyType }) => void) => {
            User.Auth(email, password).then((user: IUser) => {
                done(null, {...user, strategy: 'local'})
            }).catch((err: HttpError) => {
                done(err);
            })
        }
    ));

    // Нужно добавить callbackURL в список разрешённых
    passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECKRET,
            callbackURL: `http://${isDev ? `localhost:${process.env.PORT}` : process.env.HOSTNAME}/auth/google/callback`,
            passReqToCallback: true,
        },
        (request: Request, accessToken: string, refreshToken: string, profile: any, done: (err: Error | null, user?: IUser & { strategy: IStrategyType }) => void) => {
            User.Find(profile.email, 'email').then((user: IUser) => {
                return done(null, {...user, strategy: 'local'});
            }).catch((_: HttpError) => {
                User.Create(profile.displayName, profile.email, '12345').then((user: IUser) => {
                    return done(null, {...user, strategy: 'custom'});
                }).catch((err: HttpError) => {
                    return done(err);
                })
            });
        }
    ));

    passport.use(new VKontakteStrategy({
            clientID: process.env.VKONTAKTE_CLIENT_ID,
            clientSecret: process.env.VKONTAKTE_CLIENT_SECRET,
            callbackURL: `http://${isDev ? `localhost:${process.env.PORT}` : process.env.HOSTNAME}/auth/vkontakte/callback`,
        },
        function (accessToken: string, refreshToken: string, params: any, profile: any, done: (err: HttpError | null, user?: IUser & { strategy: IStrategyType }) => void) {
            // User.Find(profile.email, 'email').then((user: IUser) => {
            //     return done(null, {...user, strategy: 'custom'});
            // }).catch((_: HttpError) => {
            //     User.Create(profile.displayName, profile.email, '12345').then((user: IUser) => {
            //         return done(null, {...user, strategy: 'custom'});
            //     }).catch((err: HttpError) => {
            //         return done(err);
            //     })
            // });
            console.log({
                params,
                profile,
            });
            done(new HttpError('test'));
        }
    ));

    passport.serializeUser((user: IUser & { strategy: IStrategyType }, done: (err: Error | null, value: { strategy: IStrategyType, value: string }) => void) => {
        const value = {
            strategy: user.strategy,
            value: user.strategy === 'local' ? user.id : user.email,
        };
        done(null, value);
    });

    passport.deserializeUser(({value, strategy}: { strategy: IStrategyType, value: string }, done: (err: Error | null, user?: IUser) => void) => {
        User.Find(value, strategy === 'local' ? 'id' : 'email').then((user: IUser) => {
            done(null, user);
        }).catch((err: HttpError) => {
            done(err);
        });
    });
}

export {
    connectStrategy
};
