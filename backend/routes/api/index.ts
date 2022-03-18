import { Router as ExpressRouter } from 'express';
import { ApiRouterConfig } from '../../types/global';
import { createRouter as createHospitalRouter } from './hospital';
import { createRouter as createDoctorRouter } from './doctor';

let _router: ExpressRouter;

const Router = {
  init: function init(apiRouterConfig: ApiRouterConfig) {
    _router = ExpressRouter();
    const { hospitalsRepository, doctorsConfig } = apiRouterConfig;
    const hospitalsRouter = createHospitalRouter(hospitalsRepository);
    const doctorsRouter = createDoctorRouter(doctorsConfig);
    _router.use('/hospitals', hospitalsRouter);
    _router.use('/doctors', doctorsRouter);
  },

  getRouter: function getRouter() {
    return _router;
  },
};

type ApiRouterInterface = typeof Router;

function createRouter(apiRouterConfig: ApiRouterConfig): ExpressRouter {
  let router: ApiRouterInterface = Object.create(Router);
  router.init(apiRouterConfig);
  return router.getRouter();
}

export { createRouter };
