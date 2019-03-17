import * as express from 'express';
import {sendData} from "../../../utils/SendData";

const fs = require('fs');

export const getPublicFilesListRouter = function(_: express.Request, res: express.Response, __: express.NextFunction) {
    fs.readdir('./server/resources', function (err: Error, files: string[]) {
        if (err)
            console.log(err);
        sendData(res, 200, 'Load Public Files Names', {files});
    });
};

