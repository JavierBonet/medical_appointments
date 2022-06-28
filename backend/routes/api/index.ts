import { Router as ExpressRouter } from 'express';
import { ApiRouterConfig } from '../../types/global';
import { createRouter as createAdminRouter } from './admin';
import { createRouter as createPatientRouter } from './patient';

let _router: ExpressRouter;

const Router = {
  init: function init(apiRouterConfig: ApiRouterConfig) {
    _router = ExpressRouter();
    const { adminRouterConfig, patientsRouterConfig } = apiRouterConfig;

    const adminRouter = createAdminRouter(adminRouterConfig);
    const patientsRouter = createPatientRouter(patientsRouterConfig);

    _router.use('/admin', adminRouter);
    _router.use('/patients', patientsRouter);
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
