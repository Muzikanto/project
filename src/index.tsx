import * as React from 'react';
import {hydrate} from 'react-dom';
import {preloadReady} from 'react-loadable';
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {register} from './registerServiceWorker';
import reducers from "./reducers";
import App from "./pages/.App/App";
import socket from "./reducers/socket";
import {Router} from 'react-router';
import {historyState} from "./history";
import {actionsChesSocketToDispatchesTypes} from "./reducers/Chess/Chess.actions";

register();
// @ts-ignore
export const store = createStore(reducers, window.__PRELOADED_STATE__, applyMiddleware(thunk));

(() => {
    const list = actionsChesSocketToDispatchesTypes as { [key: string]: string };

    for (const key in list) {
        socket.on(list[key], function (data: any) {
            store.dispatch({
                data,
                type: list[key]
            });
        });
    }
})();

export const reactRender = (Component: React.ComponentType) => preloadReady().then(() => {
    hydrate(
        <Provider store={store}>
            <Router history={historyState}>
                <Component/>
            </Router>
        </Provider>,
        document.getElementById('root')
    )
});

reactRender(App).then();

module.hot && module.hot.accept('./pages/FilmsPage/FilmsPage', () => {
    reactRender(require('./pages/.App/App').default).then();
});
