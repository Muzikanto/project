import * as React from 'react';
import * as express from 'express';
import * as got from 'got';

import {renderToNodeStream} from 'react-dom/server';
import {Router, StaticRouter} from 'react-router';
import {createStore} from "redux";
import {Provider} from "react-redux";

import Reducers from "../../../src/reducers/index";
import {IRequestSession, IUserSession} from "../typings";
import {ReactType} from "react";
import {Application} from "express";

const script = (url: string) => `<script type="text/javascript" src="${url}" async></script>`;
const style = (url: string) => `<link rel="stylesheet" href="${url}">`;

export const renderWithApp = (App: ReactType): Application => {
    return (async (req: IRequestSession, res: express.Response, next: express.NextFunction) => {
        const {styles, scripts} = await assets(req.headers.host);

        const store = createStore(Reducers);
        store.dispatch({type: 'SET_USER', data: {user: req.user}});

        res.write(renderPage(styles, {user: req.user}));

        const stream = renderToNodeStream(
            <Provider store={store}>
                    <StaticRouter location={req.url} context={{}}>
                        <App/>
                    </StaticRouter>
            </Provider>
        );

        stream.pipe(res, {end: false});

        stream.on('end', () => {
            res.write(`</div>${scripts.join('')}</body></html>`);
            res.end();
            next();
        });

        res.end();
        next();
    }) as Application;
};

interface IRreloadState {
    user: IUserSession | null
}

export function renderPage(styles: string[], preloadState: IRreloadState) {
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
            <base href="/">
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="description" content="ReactApp">
            <meta name="robots" content="all,follow">
            <meta charset="utf-8">
            <meta name="theme-color" content="#000000">
            <title>Title</title>
            <link rel="manifest" href="manifest.json">
            <link rel="shortcut icon" href="favicon.ico">
            ${styles.join('')}
            <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript" async></script>
            </head>${getPreloadStateScript(preloadState)}
            <body><div id="root">`
}

async function assets(host?: string) {
    const manifest = 'asset-manifest.json';

    const assetsManifest = await got(`http://${host}/${manifest}`, {json: true});
    const assetsMap = assetsManifest.body;

    const chunks: string[] = [];
    const bundle: string[] = [];
    const styles: string[] = [];

    for (const key in assetsMap) {
        const asset = assetsMap[key];
        if (!asset.endsWith('.map') && asset.endsWith('.js')) {
            const tag = script(asset);
            asset.includes('.chunk') ? chunks.push(tag) : bundle.push(tag);
        }

        if (!asset.endsWith('.map') && asset.endsWith('chunk.css')) {
            styles.push(style(asset));
        }
    }

    return {
        styles,
        scripts: bundle.concat(chunks.shift() as string, chunks.reverse()[0])
    };
}

function getPreloadStateScript(preloadState: IRreloadState) {
    return `<script> window.__PRELOADED_STATE__ = ${JSON.stringify(preloadState).replace(
        /</g,
        '\\\\\u003c'
    )}</script>`
}
