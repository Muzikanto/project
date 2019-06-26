import {Router} from "express-serve-static-core";
import {loginRouter} from "./auth/login";
import {logoutRouter} from "./auth/logout";
import {registerRouter} from "./auth/register";
import {sendFileRouter} from "./files/files_send";
import {getPublicFilesListRouter} from "./files/files_list";
import {loadFileRouter} from "./files/files_load";
import {renderWithApp} from "./render";
import App from "../../src/pages/.App/App";
import AppRouters from "../../src/pages/.App/App.routers";
import {selectFilmsRouter} from "./Films/select";
import {createFilmRouter} from "./Films/create";
import {changeFilmRouter} from "./Films/change";
import {changeFilmStarsRouter} from "./Films/setStar";
import {favoriteFilmRouter} from "./Films/setFavorite";
import {selectSingleFilmRouter} from "./Films/selectSingle";
import * as passport from "passport";
import {googleAuthRouter} from "./auth/google";
import {googleAuthCallbackRouter} from "./auth/google_cb";
import {vkontakteAuthRouter} from "./auth/vkontakte_auth";
import {vkontakteAuthCallbackRouter} from "./auth/vkontakte_auth_cb";

export default function apiRoutes(router: Router): Router {
    router.get(['/', ...AppRouters.map(el => el.url), '/index.html'], renderWithApp(App));

    /* User */
    router.post('/auth/local', loginRouter);
    router.post('/auth/logout', logoutRouter);
    router.post('/auth/register', registerRouter);

    router.get('/auth/google', googleAuthRouter);
    router.get('/auth/google/callback', googleAuthCallbackRouter);

    router.get('/auth/vkontakte', vkontakteAuthRouter);
    router.get('/auth/vkontakte/callback', vkontakteAuthCallbackRouter);

    /* Resources */
    router.post('/api/data/image', loadFileRouter);
    router.get('/api/resources_list', getPublicFilesListRouter);
    router.get('/api/resources/:name', sendFileRouter);

    /* Films */
    router.get('/api/films/select', selectFilmsRouter);
    router.get('/api/films/select/:id', selectSingleFilmRouter);
    router.post('/api/films/create', createFilmRouter);
    router.post('/api/films/change', changeFilmRouter);
    router.post('/api/films/change_star', changeFilmStarsRouter);
    router.post('/api/films/set_favorite', favoriteFilmRouter);

    return router;
};
