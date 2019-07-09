import * as express from 'express';
import * as path from 'path';
import {Application} from "express";
import {IRequest, IResponse} from "../typings";

const multer = require('multer');

const storage = multer.diskStorage({
    destination(_: express.Request, __: any, cb: (err: Error | null, path: string) => void) {
        cb(null, path.join(__dirname, '../../server/resources/'));
    },
    filename(_: express.Request, file: any, cb: (err: Error | null, name: string) => void) {
        cb(null, `image-${file.originalname}`);
    }
});

function fileFilter(_: Express.Request, file: any, callback: (err: Error | null, accept: boolean) => void) {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'), false);
    }
    callback(null, true);
}

export const loadFileRouter = ((req: IRequest, res: IResponse, next: express.NextFunction) => {
    const loader = multer({
        storage,
        fileFilter,
        limits: {
            fileSize: 1024 * 1024 * 5
        }
    }).single('load_image');

    loader(req, res, (err: Error) => {
        if (err instanceof multer.MulterError) {
            res.sendResponse( {status: 403, message: err.message});
        } else if (err) {
            res.sendResponse( {status: 400, message: err.message});
        } else
            res.sendResponse( {status: 200, message: 'Success Load'});
    });
}) as Application;

