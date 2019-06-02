import {join} from 'path';
import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import {preloadAll} from 'react-loadable';
import {sessionOptions} from "./lib/psqlSessionStore";
import loadUser from "./middleware/loadUser";
import {connectSocket} from "./socket";
import {Server, createServer} from "http"
import apiRoutes from "./routes";

const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === 'development';

const staticStorage = join(__dirname, '..', '..', 'build');

const cluster = require('cluster');
const cpuCount = require('os').cpus().length;
const workers = [];

let server: Server;

if (isDev) {
    run();

    for (const pathToHotFiles of ['../src/pages/.App/App.routers.ts', '../src/pages/App/App', './index.ts']) {
        module.hot && module.hot.accept(pathToHotFiles, () => {
            run();
        });
    }

    process.argv.push('--config-overrides', './.config/webpack.client.js');
    require('react-app-rewired/scripts/start');
} else {
    if (cluster.isMaster) {
        console.error(`Node cluster master ${process.pid} is running`);
        for (let i = 0; i < cpuCount; i += 1) {
            const worker = cluster.fork();
            workers.push(worker);
        }
        cluster.on('exit', (worker: any) => {
            console.log(`worker ${worker.process.pid} died`);
            cluster.fork();
        });
    }

    if (cluster.isWorker) {
        run();
    }
}

function run() {
    server && server.close();
    const app = express();

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(morgan('dev'));

    app.use('/resources', express.static(join(__dirname, '..', '..', '/server/resources')));

    if (isDev) {
        const webpackDevServerProxy = require('http-proxy-middleware')({
            target: 'http://localhost:3001',
            changeOrigin: true,
            ws: true
        });

        app.use(['**/*.*', '/static', '/sockjs-node'], webpackDevServerProxy);
    } else {
        app.use(compression());
        app.use(express.static(staticStorage));
    }

    app.use(sessionOptions);
    app.use(loadUser);

    app.use(apiRoutes(express.Router()));

    preloadAll().then(() => {
        server = createServer(app);
        server.listen(port, () => {
            console.error(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: listening on port ${port}`);
        });
        app.set('io', connectSocket(server));
    });
}
