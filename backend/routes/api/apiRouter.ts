import { Router as ExpressRouter } from 'express';
import { ApiRouterConfig } from '../../types/global';
import { createAdminRouter } from './admin/adminRouter';
import { createPatientRouter } from './patient/patientRouter';

let _router: ExpressRouter;

const ApiRouter = {
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

type ApiRouterInterface = typeof ApiRouter;

function createApiRouter(apiRouterConfig: ApiRouterConfig): ExpressRouter {
  let router: ApiRouterInterface = Object.create(ApiRouter);
  router.init(apiRouterConfig);
  return router.getRouter();
}

export { createApiRouter };
