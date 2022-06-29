import { Router as ExpressRouter } from 'express';
import { RouterConfig } from '../types/global';
import { createApiRouter } from './api/apiRouter';

let _router: ExpressRouter;

const Router = {
  init: function init(routerConfig: RouterConfig) {
    _router = ExpressRouter();
    const apiRouter = createApiRouter(routerConfig.apiRouterConfig);
    _router.use('/api', apiRouter);
  },

  getRouter: function getRouter() {
    return _router;
  },
};

function createRouter(routerConfig: RouterConfig): ExpressRouter {
  let router: RouterInterface = Object.create(Router);
  router.init(routerConfig);
  return router.getRouter();
}

type RouterInterface = typeof Router;

export { createRouter };
