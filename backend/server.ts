import express, { Application } from 'express';
import cors from 'cors';
import { createRouter } from './routes';
import { GeneralRouterConfig } from './types/global';
import authenticationConfig from './authenticationConfig';

import passport from 'passport';
const session = require('express-session');
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
      // To allow requests coming from the frontend
      origin: 'http://localhost:8080',
      // To allow sending the cookies from the frontend
      credentials: true,
    };

    _app.use(cors(corsOptions));

    // Authentication and session initialization
    _app.use(
      session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
      })
    );

    _app.use(passport.initialize());

    _app.use(passport.session());

    // Configure authentication strategies
    const patientsRepository =
      config.routerConfig.apiRouterConfig.patientsRouterConfig
        .patientsRepository;
    const adminUsersRepository =
      config.routerConfig.apiRouterConfig.adminRouterConfig
        .adminUsersRepository;
    authenticationConfig(passport, patientsRepository, adminUsersRepository);

    // -----------------------------------------

    const router = createRouter(config.routerConfig);
    _app.use(router);

    _port = port;
  },

  start: function start() {
    _app.listen(_port, () => {
      console.log(`Running on port ${_port}`);
    });
  },
};

export default Server;
