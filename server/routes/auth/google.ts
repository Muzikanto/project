import * as passport from "passport";

export const googleAuthRouter =  passport.authenticate('google', { scope:
        [ 'email', 'profile' ] }
);
