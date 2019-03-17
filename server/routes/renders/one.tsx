import * as React from 'react';
import * as express from 'express';
import {renderToNodeStream} from 'react-dom/server';
import {StaticRouter as Router} from 'react-router';
import {createStore} from "redux";
import {Provider} from "react-redux";

import Reducers from "../../../src/reducers/index";
import {IRequestSession} from "../interfaces";
import {renderPage} from "./index";
import App from "../../../src/pages/.App/App";


export const firstRender = (assets: (host?: string) => Promise<{ styles: string[]; scripts: string[]; }>) => {
    return async (req: IRequestSession, res: express.Response, next: express.NextFunction) => {
        const {styles, scripts} = await assets(req.headers.host);

        const store = createStore(Reducers);
        store.dispatch({type: 'SET_USER', data: {user: req.user}});

        res.write(renderPage(styles, {user: req.user}));

        const stream = renderToNodeStream(
            <Provider store={store}>
                <Router location={req.url} context={{}}>
                    <App/>
                </Router>
            </Provider>
        );

        stream.pipe(res, {end: false});

        stream.on('end', () => {
            res.write(`</div>${scripts.join('')}<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript" async></script></body></html>`);
            res.end();
            next();
        });

        res.end();
        next();
    };
};



