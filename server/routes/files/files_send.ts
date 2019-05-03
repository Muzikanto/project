import * as express from 'express';
import {join} from "path";

export const sendFileRouter = function (req: express.Request, res: express.Response, _: express.NextFunction) {
    console.log('--------------------------');
    res.download(join(__dirname, '..', '..', `/server/resources/${req.params.name}`));
};
