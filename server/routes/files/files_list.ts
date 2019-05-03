import * as express from 'express';
import {sendResponse} from "../../utils/SendData";

const fs = require('fs');

export const getPublicFilesListRouter = function(_: express.Request, res: express.Response, __: express.NextFunction) {
    fs.readdir('./server/resources', function (err: Error, files: string[]) {
        if (err)
            console.log(err);
        sendResponse(res, {status: 200, message: 'Load Public Files Names', response: {files}});
    });
};

