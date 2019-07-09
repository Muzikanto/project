import * as passport from "passport";

export const vkontakteAuthRouter =  passport.authenticate('vkontakte', { scope:
        [ 'email', 'profile' ] }
);
