import * as got from 'got';

import {Router} from "express-serve-static-core";
import {firstRender} from "./one";
import {IUserSession} from "../interfaces";

const script = (url: string) => `<script type="text/javascript" src="${url}" async></script>`;
const style = (url: string) => `<link rel="stylesheet" href="${url}">`;

export function renderPages(router: Router): Router {
    router.get(['/', '/page1'], firstRender(assets) as any);

    return router;
}

export function renderPage(styles: string[], preloadState: { user: IUserSession | null }) {
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
                    </head>
                    <body><script> window.__PRELOADED_STATE__ = ${JSON.stringify(preloadState).replace(
        /</g,
        '\\\u003c'
    )}</script><div id="root">`
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
