import * as express from 'express';
import {Application} from "express";
import {IRequest, IResponse} from "../typings";

const fs = require('fs');

export const getPublicFilesListRouter = function(_: IRequest, res: IResponse, __: express.NextFunction) {
    fs.readdir('./server/resources', function (err: Error, files: string[]) {
        if (err)
            console.log(err);
        res.sendResponse( {status: 200, message: 'Load Public Files Names', response: files});
    });
} as Application;

