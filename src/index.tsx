import * as React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {preloadReady} from 'react-loadable';
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {register} from './registerServiceWorker';
import reducers from "./reducers";
import App from "./pages/.App/App";
import actions, {socketActionsToDispatches} from "./actions";
import socket from "./reducers/socket";

register();

export const store = createStore(reducers, applyMiddleware(thunk));

(() => {
    // @ts-ignore
    const preload = window.__PRELOADED_STATE__;
    // @ts-ignore
    delete window.__PRELOADED_STATE__;
    store.dispatch({
        type: actions.SET_USER,
        data: {user: preload.user}
    });

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
                <Router>
                    <Component/>
                </Router>
            </Provider>,
            document.getElementById('root')
        )
    }
);

render(App).then();

module.hot && module.hot.accept('./pages/.App/App', () => {
    render(require('./pages/.App/App').default).then();
});
