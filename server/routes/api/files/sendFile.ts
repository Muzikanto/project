import * as express from 'express';

export const sendFileRouter = function (req: express.Request, res: express.Response, _: express.NextFunction) {
    res.download(`resources/${req.params.name}`);
}
