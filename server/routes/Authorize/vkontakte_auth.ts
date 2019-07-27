import * as passport from "passport";

export const VkAuth =  passport.authenticate('vkontakte', { scope:
        [ 'email', 'profile' ] }
);
