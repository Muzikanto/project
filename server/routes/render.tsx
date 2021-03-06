import * as React from 'react';
import * as express from 'express';
import * as got from 'got';
import {renderToString} from 'react-dom/server';
import {StaticRouter} from 'react-router';
import {createStore, DeepPartial} from "redux";
import {Provider} from "react-redux";
import Reducers from "../../src/reducers";
import {ReactType} from "react";
import {Application} from "express";
import {IStore} from "../../src/reducers/typings";
import {getBaseFilmsReducerState} from "../../src/reducers/Films";
import FilmModel from "../models/Film";
import {ThemeProvider, ServerStyleSheets} from "@material-ui/styles";
import {muiTheme} from "../../src/src.utils/mui";
import {prepareFilms} from "../../src/reducers/Films/Films.helpers";
import {IFilmTypings as IFilmTypingsClient} from "../../src/reducers/Films/Films.typings";
import {IRequest, IResponse} from "./typings";
import {IFilmTypings} from "./Films/Films.typings";

const script = (url: string) => `<script type="text/javascript" src="${url}" async></script>`;
const style = (url: string) => `<link rel="stylesheet" href="${url}">`;

export const renderWithApp = (App: ReactType): Application => {
    return (async (req: IRequest, res: IResponse, next: express.NextFunction) => {
        const filters = req.query as IFilmTypings.SelectQuery;
        const {styles, scripts} = await assets(req.headers.host);

        let films: IFilmTypingsClient.Item[] = [];
        try {
            films = prepareFilms(await FilmModel.Select(filters.query ? {query: decodeURI(filters.query)} : filters, req.user));
        } catch (e) {
            // TODO need Logic
        }
        const preloadState: Partial<IStore> = {
            User: {
                user: req.user
            },
            Films: {
                ...getBaseFilmsReducerState(),
                arr: films,
            },
        };
        const store = createStore(Reducers, preloadState, undefined);

        const sheets = new ServerStyleSheets();

        const html = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url === '/index.html' ? '/' : req.url} context={{}}>
                    {
                        sheets.collect(
                            <ThemeProvider theme={muiTheme}>
                                <App/>
                            </ThemeProvider>
                        )
                    }
                </StaticRouter>
            </Provider>
        );

        res.status(200).send(renderPage(html, styles, scripts, preloadState, sheets.toString()));
    }) as Application;
};

export function renderPage(html: string, styles: string[], scripts: string[], preloadState: DeepPartial<IStore>, css: string) {
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <base href="/">
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <meta name="description" content="ReactApp">
                <meta name="robots" content="all,follow">
                <meta name="theme-color" content="#000000">
                <title>Muzikanto</title>
                <link rel="manifest" href="manifest.json">
                <link rel="shortcut icon" href="favicon.ico">
                ${styles.join('')}
                <style id="server-styles">${css}</style>
            </head>
            <body>
                <script id="server-scripts">window.__PRELOADED_STATE__ = ${JSON.stringify(preloadState).replace(
        /</g,
        '\\\\\u003c'
                )}</script>
                <div id="root">${html}</div>
                ${scripts.join('')}
            </body>
            </html>
`
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
