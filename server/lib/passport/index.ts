import {IUser} from "../../../src/reducers/User/User.typings";
import HttpError from "../../error";
import User from "../../models/user/user";
import googleStrategy from "./google";
import {PassportStatic} from "passport";
import vkStrategy from "./vk";
import localStrategy from "./local";
import yandexStrategy from "./yandex";

export type IStrategyType = 'local' | 'custom';

function connectStrategy(passport: PassportStatic) {
    passport.use(localStrategy);
    passport.use(googleStrategy);
    passport.use(vkStrategy);
    passport.use(yandexStrategy);

    passport.serializeUser(({user, strategy}: { strategy: IStrategyType, user: IUser }, done: (err: Error | null, value: { strategy: IStrategyType, value: string }) => void) => {
        const value = {
            strategy,
            value: strategy === 'local' ? user.id : user.email,
        };
        done(null, value);
    });

    passport.deserializeUser(({value, strategy}: { strategy: IStrategyType, value: string }, done: (err: Error | null, user?: IUser) => void) => {
        User.Find({value, column: strategy === 'local' ? 'id' : 'email'}).then((user: IUser) => {
            done(null, user);
        }).catch((err: HttpError) => {
            done(err);
        });
    });
}

export {
    connectStrategy
};
