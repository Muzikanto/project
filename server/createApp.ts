import {join} from 'path';
import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import {preloadAll} from 'react-loadable';
import {connectSocket} from "./socket";
import {createServer} from "http"
import apiRoutes from "./routes";
import {Server} from "http"
import sendResponse from "./middleware/sendResponse";
import {session} from "./lib/session";
import * as passport from "passport";
import {connectStrategy} from "./lib/passport";

const isDev = process.env.NODE_ENV === 'development';
const staticStorage = join(__dirname, '..', '..', 'build');

connectStrategy(passport);

async function createApp(port: number | string): Promise<Server> {
    let server: Server;
    const app = express();

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.use('/resources', express.static(join(__dirname, '..', '..', '/server/resources')));

    if (isDev) {
        app.use(morgan('dev'));
        const webpackDevServerProxy = require('http-proxy-middleware')({
            target: `http://localhost:${process.env.PROXY}`,
            changeOrigin: true,
            ws: true
        });

        app.use(['**/*.*', '/static', '/sockjs-node'], webpackDevServerProxy);
    } else {
        app.use(compression());
        app.use(express.static(staticStorage));
    }

    app.use(session);
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(sendResponse);

    app.use(apiRoutes(express.Router()));

    await preloadAll();

    server = createServer(app);
    server.listen(port, () => {
        console.error(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: listening on port ${port}`);
    });
    app.set('io', connectSocket(server));

    return server;
}

export default createApp;
