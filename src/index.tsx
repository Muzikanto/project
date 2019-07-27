import * as React from 'react';
import {hydrate} from 'react-dom';
import {preloadReady} from 'react-loadable';
import {Provider} from "react-redux";
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {register} from './registerServiceWorker';
import reducers from "./reducers";
import App from "./pages/.App/App";
import {Router} from 'react-router';
import {historyState} from "./history";
import {muiTheme} from "./src.utils/mui";
import {ThemeProvider} from "@material-ui/styles";

register();
// @ts-ignore
export const store = createStore(reducers, window.__PRELOADED_STATE__, applyMiddleware(thunk));

export const reactRender = (Component: React.ComponentType) => preloadReady().then(() => {
    const serverStyles = document.querySelector('#server-styles');
    if (serverStyles && serverStyles.parentNode) {
        serverStyles.parentNode.removeChild(serverStyles);
    }

    const serverScripts = document.querySelector('#server-scripts');
    if (serverScripts && serverScripts.parentNode) {
        serverScripts.parentNode.removeChild(serverScripts);
    }

    return hydrate(
        <Provider store={store}>
            <Router history={historyState}>
                <ThemeProvider theme={muiTheme}>
                    <Component/>
                </ThemeProvider>
            </Router>
        </Provider>,
        document.getElementById('root')
    )
});

reactRender(App).then();

module.hot && module.hot.accept('./pages/.App/App', () => {
    reactRender(require('./pages/.App/App').default).then();
});
