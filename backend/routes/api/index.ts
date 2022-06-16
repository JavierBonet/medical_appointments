import { Router as ExpressRouter } from 'express';
import { ApiRouterConfig } from '../../types/global';
import { createRouter as createHospitalRouter } from './hospital';
import { createRouter as createDoctorRouter } from './doctor';
import { createRouter as createPatientRouter } from './patient';
import { createRouter as createAdminUserRouter } from './admin_user';

let _router: ExpressRouter;

const Router = {
  init: function init(apiRouterConfig: ApiRouterConfig) {
    _router = ExpressRouter();
    const {
      doctorsConfig,
      patientsConfig,
      hospitalsRepository,
      adminUsersRepository,
    } = apiRouterConfig;
    const doctorsRouter = createDoctorRouter(doctorsConfig);
    const patientsRouter = createPatientRouter(patientsConfig);
    const hospitalsRouter = createHospitalRouter(hospitalsRepository);
    const adminUsersRouter = createAdminUserRouter(adminUsersRepository);
    _router.use('/doctors', doctorsRouter);
    _router.use('/hospitals', hospitalsRouter);
    _router.use('/patients', patientsRouter);
    _router.use('/admin_users', adminUsersRouter);
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
