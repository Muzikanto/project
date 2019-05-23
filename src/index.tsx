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
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import JssProvider from 'react-jss/lib/JssProvider';
import createGenerateClassName from "@material-ui/core/styles/createGenerateClassName";
import {muiTheme} from "./utils/mui";

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


const generateClassName = createGenerateClassName();

export const reactRender = (Component: React.ComponentType) => preloadReady().then(() => {
    hydrate(
        <Provider store={store}>
            <Router history={historyState}>
                <JssProvider generateClassName={generateClassName}>
                    <MuiThemeProvider theme={muiTheme}>
                        <Component/>
                    </MuiThemeProvider>
                </JssProvider>
            </Router>
        </Provider>,
        document.getElementById('root')
    )
});

reactRender(App).then();

module.hot && module.hot.accept('./pages/FilmsPage/FilmsPage', () => {
    reactRender(require('./pages/.App/App').default).then();
});
