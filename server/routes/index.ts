import {Router} from "express-serve-static-core";
import {testRouter} from "./test";
import {loginRouter} from "./authorize/login";
import {logoutRouter} from "./authorize/logout";
import {registerRouter} from "./authorize/register";
import {sendFileRouter} from "./files/files_send";
import {getPublicFilesListRouter} from "./files/files_list";
import {loadFileRouter} from "./files/files_load";
import {renderWithApp} from "./helpers/render";
import App from "../../src/pages/.App/App";

export default function apiRoutes(router: Router): Router {
    router.get(['/', '/page1', '/register', '/login', '/chess'], renderWithApp(App));

    router.get('/api/test', testRouter);

    /* User */
    router.post('/api/authorize', loginRouter);
    router.post('/api/logout', logoutRouter);
    router.post('/api/register', registerRouter);

    /* Resources */
    router.post('/api/data/image', loadFileRouter);
    router.get('/api/resources_list', getPublicFilesListRouter);
    router.get('/api/resources/:name', sendFileRouter);

    return router;
};
