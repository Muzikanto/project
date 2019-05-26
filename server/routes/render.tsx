import * as React from 'react';
import * as express from 'express';
import * as got from 'got';
import {renderToNodeStream} from 'react-dom/server';
import {StaticRouter} from 'react-router';
import {createStore, DeepPartial} from "redux";
import {Provider} from "react-redux";
import Reducers from "../../src/reducers";
import {IRequestSession} from "./typings";
import {ReactType} from "react";
import {Application} from "express";
import {IStore} from "../../src/reducers/typings";
import {getBaseFilmsReducerState} from "../../src/reducers/Films/Films";
import {SelectFilms} from "../models/postgreSql/films/select";
import {IselectFilmsRouterQuery} from "./Films/select";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import JssProvider from 'react-jss/lib/JssProvider';
import {createGenerateClassName} from "react-jss";
import {SheetsRegistry} from 'jss';
import {muiTheme} from "../../src/utils/mui";
import {prepareFilms} from "../../src/reducers/Films/Films.helpers";
import {IFilm} from "../../src/reducers/Films/Films.typings";

const script = (url: string) => `<script type="text/javascript" src="${url}" async></script>`;
const style = (url: string) => `<link rel="stylesheet" href="${url}">`;

export const renderWithApp = (App: ReactType): Application => {
    return (async (req: IRequestSession, res: express.Response, next: express.NextFunction) => {
        const filters = req.query as IselectFilmsRouterQuery;
        const {styles, scripts} = await assets(req.headers.host);

        let films: IFilm[] = [];
        try {
            films = prepareFilms(await SelectFilms(filters))
        } catch (e) {
            // Need Logic
        }
        const preloadState: Partial<IStore> = {
            User: {
                user: req.user
            },
            FilmsReducer: {
                ...getBaseFilmsReducerState(),
                arr: films,
            },
        };
        const store = createStore(Reducers, preloadState, undefined);

        const sheetsRegistry = new SheetsRegistry();
        const generateClassName = createGenerateClassName();

        res.write(renderPage(styles, preloadState, sheetsRegistry.toString()));
        const stream = renderToNodeStream(
            <Provider store={store}>
                <StaticRouter location={req.url} context={{}}>
                    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                        <MuiThemeProvider theme={muiTheme}>
                            <App/>
                        </MuiThemeProvider>
                    </JssProvider>
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

export function renderPage(styles: string[], preloadState: DeepPartial<IStore>, css: string) {
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
            <base href="/">
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="description" content="ReactApp">
            <meta name="robots" content="all,follow">
            <meta name="theme-color" content="#000000">
            <title>Muziknato</title>
            <link rel="manifest" href="manifest.json">
            <link rel="shortcut icon" href="favicon.ico">
            ${styles.join('')}
            <style id="jss-server-side">${css}</style>
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

function getPreloadStateScript(preloadState: DeepPartial<IStore>) {
    return `<script> window.__PRELOADED_STATE__ = ${JSON.stringify(preloadState).replace(
        /</g,
        '\\\\\u003c'
    )}</script>`
}
