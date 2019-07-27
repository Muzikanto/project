import * as passport from "passport";

export const GoogleAuth =  passport.authenticate('google', { scope:
        [ 'email', 'profile' ] }
);
