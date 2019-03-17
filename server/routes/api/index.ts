import * as express from 'express';
import {Router} from "express-serve-static-core";

import {testRouter} from "./test";
import {loginRouter} from "./authorize/login";
import {logoutRouter} from "./authorize/logout";
import {registerRouter} from "./authorize/register";
import {sendFileRouter} from "./files/sendFile";
import {getPublicFilesListRouter} from "./files/getPublicFilesNamesList";
import {loadFileRouter} from "./files/loadFile";


export default function apiRoutes(): Router {
    const router = express.Router();

    router.get('/api/test', testRouter);

    /* User */
    router.post('/api/authorize', loginRouter as any);
    router.post('/api/logout', logoutRouter as any);
    router.post('/api/registration', registerRouter as any);

    /* Resources */
    router.post('/api/data/image', loadFileRouter);
    router.get('/api/public_files', getPublicFilesListRouter);
    router.get('/api/resources/:name', sendFileRouter);

    return router;
};
