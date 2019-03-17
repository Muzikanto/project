import {Router} from "express-serve-static-core";

import {testRouter} from "./test";
import {loginRouter} from "./authorize/login";
import {logoutRouter} from "./authorize/logout";
import {registerRouter} from "./authorize/register";
import {sendFileRouter} from "./files/send_file";
import {getPublicFilesListRouter} from "./files/get_publicFiles_list";
import {loadFileRouter} from "./files/load_file";


export default function apiRoutes(router: Router): Router {
    router.get('/api/test', testRouter);

    /* User */
    router.post('/api/authorize', loginRouter as any);
    router.post('/api/logout', logoutRouter as any);
    router.post('/api/registration', registerRouter as any);

    /* Resources */
    router.post('/api/data/image', loadFileRouter);
    router.get('/api/resources_list', getPublicFilesListRouter);
    router.get('/api/resources/:name', sendFileRouter);

    return router;
};
