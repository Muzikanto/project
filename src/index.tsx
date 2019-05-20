import * as React from 'react';
import {hydrate} from 'react-dom';
import {preloadReady} from 'react-loadable';
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {register} from './registerServiceWorker';
import reducers from "./reducers";
import App from "./pages/.App/App";
import {socketActionsToDispatches} from "./actions";
import socket from "./reducers/socket";
import {Router} from 'react-router';
import {historyState} from "./history";

register();
// @ts-ignore
export const store = createStore(reducers, window.__PRELOADED_STATE__, applyMiddleware(thunk));

(() => {
    const list = socketActionsToDispatches as { [key: string]: string };

    for (const key in list) {
        socket.on(list[key], function (data: any) {
            store.dispatch({
                data,
                type: list[key]
            });
        });
    }
})();

const render = (Component: React.ComponentType) => preloadReady().then(() => {
    hydrate(
        <Provider store={store}>
            <Router history={historyState}>
                <Component/>
            </Router>
        </Provider>,
        document.getElementById('root')
    )
});

render(App).then();

module.hot && module.hot.accept('./pages/.App/App', () => {
    render(require('./pages/.App/App').default).then();
});
