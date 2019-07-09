import {Router} from "express-serve-static-core";
import {sendFileRouter} from "./Files/files_send";
import {getPublicFilesListRouter} from "./Files/files_list";
import {loadFileRouter} from "./Files/files_load";
import {renderWithApp} from "./render";
import App from "../../src/pages/.App/App";
import AppRouters from "../../src/pages/.App/App.routers";
import {selectFilmsRouter} from "./Films/select";
import {createFilmRouter} from "./Films/create";
import {changeFilmRouter} from "./Films/change";
import {changeFilmStarsRouter} from "./Films/setStar";
import {favoriteFilmRouter} from "./Films/setFavorite";
import {selectSingleFilmRouter} from "./Films/selectSingle";
import {localAuthRouter} from "./Authorize/local_auth";
import {logoutRouter} from "./Authorize/logout";
import {registerRouter} from "./Authorize/register";
import {googleAuthRouter} from "./Authorize/google_auth";
import {googleAuthCallbackRouter} from "./Authorize/google_auth_cb";
import {vkontakteAuthRouter} from "./Authorize/vkontakte_auth";
import {vkontakteAuthCallbackRouter} from "./Authorize/vkontakte_auth_cb";
import {yandexAuthRouter} from "./Authorize/yandex_auth";
import {yandexeAuthCallbackRouter} from "./Authorize/yandex_auth_cb";

export default function apiRoutes(router: Router): Router {
    /* User */
    router.post('/auth/local', localAuthRouter);
    router.post('/auth/logout', logoutRouter);
    router.post('/auth/register', registerRouter);

    router.get('/auth/google', googleAuthRouter);
    router.get('/auth/google/callback', googleAuthCallbackRouter);

    router.get('/auth/vkontakte', vkontakteAuthRouter);
    router.get('/auth/vkontakte/callback', vkontakteAuthCallbackRouter);

    router.get('/auth/yandex', yandexAuthRouter);
    router.get('/auth/yandex/callback', yandexeAuthCallbackRouter);

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

    router.get(['/', ...AppRouters.map(el => el.url), '/index.html'], renderWithApp(App));

    return router;
};
