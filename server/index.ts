import {Server} from "http"
import Process = NodeJS.Process;
import createApp from "./createApp";

const isDev = process.env.NODE_ENV === 'development';

const cluster = require('cluster');
const cpuCount = require('os').cpus().length;
const workers = [];

let server: Server;
isDev && createCluster(process);

function createCluster(process: Process) {
    const workersCount = isDev ? cpuCount : process.env.WEB_CONCURRENCY || 1;
    const port = process.env.PORT || 3000;

    if (isDev) {
        run(port);

        module.hot && module.hot.accept('./createApp.ts', () => {
            run(port);
        });

        const _port = process.env.PORT;
        process.env.PORT = process.env.PROXY || '3001';
        process.argv.push('--config-overrides', './.config/webpack.client.js');
        require('react-app-rewired/scripts/start');
        process.env.PORT = _port;
    } else {
        if (cluster.isMaster) {
            console.error(`Node cluster master ${process.pid} is running`);
            for (let i = 0; i < workersCount; i += 1) {
                const worker = cluster.fork();
                workers.push(worker);
            }
            cluster.on('exit', (worker: any) => {
                console.log(`worker ${worker.process.pid} died`);
                cluster.fork();
            });
        }

        if (cluster.isWorker) {
            run(port);
        }
    }
}

function run(port: string | number) {
    server && server.close();
    createApp(port).then((_server) => {
        server = _server
    })
}

export default createCluster;
