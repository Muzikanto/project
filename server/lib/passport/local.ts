import {IUser} from "../../../src/reducers/User/User.typings";
import UserModel from "../../models/User";
import {IStrategyType} from "./index";

const LocalStrategy = require('passport-local').Strategy;

const localStrategy = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email: string, password: string, done: (err: Error | null, data?: {user: IUser, strategy: IStrategyType }) => void) => {
        try {
            const user = await UserModel.Authorize({email, password});

            done(null, {user, strategy: 'local'});
        } catch (err) {
            console.log(err);
            done(err);
        }
    }
);

export default localStrategy;
