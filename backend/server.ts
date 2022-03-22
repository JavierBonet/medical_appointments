import express, { Application } from 'express';
import cors from 'cors';
import { createRouter } from './routes';
import { GeneralRouterConfig, RouterConfig } from './types/global';
const listEndpoints = require('express-list-endpoints');

export interface ServerInterface {
  init: (config: GeneralRouterConfig, port?: number) => void;
  start: () => void;
}

let _app: Application;
let _port: number;

const Server: ServerInterface = {
  init: function init(config: GeneralRouterConfig, port = 3000) {
    _app = express();
    _app.use(express.urlencoded({ extended: true }));
    _app.use(express.json());

    const corsOptions = {
      origin: 'http://localhost:8080',
    };

    _app.use(cors(corsOptions));
    const router = createRouter(config.routerConfig);
    _app.use(router);
    console.log(listEndpoints(_app));

    _port = port;
  },

  start: function start() {
    _app.listen(_port, () => {
      console.log(`Running on port ${_port}`);
    });
  },
};

export default Server;
