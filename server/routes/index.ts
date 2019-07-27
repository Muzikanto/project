import {Router} from "express-serve-static-core";
import {sendFileRouter} from "./Files/files_send";
import {getPublicFilesListRouter} from "./Files/files_list";
import {loadFileRouter} from "./Files/files_load";
import {renderWithApp} from "./render";
import App from "../../src/pages/.App/App";
import AppRouters from "../../src/pages/.App/App.routers";
import FilmRouters from "./Films";
import AuthorizeRouters from "./Authorize";

export default function apiRoutes(router: Router): Router {
    /* User */
    router.post('/auth/local', AuthorizeRouters.LocalAuth);
    router.post('/auth/logout', AuthorizeRouters.Logout);
    router.post('/auth/register', AuthorizeRouters.LocalRegister);

    router.get('/auth/google', AuthorizeRouters.GoogleAuth);
    router.get('/auth/google/callback', AuthorizeRouters.GoogleAuthCB);

    router.get('/auth/vkontakte', AuthorizeRouters.VkAuth);
    router.get('/auth/vkontakte/callback', AuthorizeRouters.VkAuthCB);

    router.get('/auth/yandex', AuthorizeRouters.YandexAuth);
    router.get('/auth/yandex/callback', AuthorizeRouters.YandexAuthCB);

    /* Resources */
    router.post('/api/data/image', loadFileRouter);
    router.get('/api/resources_list', getPublicFilesListRouter);
    router.get('/api/resources/:name', sendFileRouter);

    /* Films */
    router.get('/api/films/select', FilmRouters.Select);
    router.get('/api/films/select/:id', FilmRouters.SelectOne);
    router.post('/api/films/create', FilmRouters.Create);
    router.post('/api/films/change', FilmRouters.Change);
    router.post('/api/films/change_star', FilmRouters.setStar);
    router.post('/api/films/set_favorite', FilmRouters.setFavorite);

    router.get(['/', ...AppRouters.map(el => el.url), '/index.html'], renderWithApp(App));

    return router;
};
