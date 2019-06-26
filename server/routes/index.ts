import {Router} from "express-serve-static-core";
import {loginRouter} from "./authorize/login";
import {logoutRouter} from "./authorize/logout";
import {registerRouter} from "./authorize/register";
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

export default function apiRoutes(router: Router): Router {
    router.get(['/', ...AppRouters.map(el => el.url), '/index.html'], renderWithApp(App));

    /* User */
    router.post('/api/authorize', loginRouter);
    router.post('/api/logout', logoutRouter);
    router.post('/api/register', registerRouter);

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
