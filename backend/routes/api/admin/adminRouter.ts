import { Router as ExpressRouter } from 'express';
import { AdminRouterConfig } from '../../../types/global';
import { createHospitalRouter } from './hospital/hospitalRouter';
import { createDoctorRouter } from './doctor/doctorRouter';
import { addAuthenticationRoutes } from './authenticationRoutes';
import { AdminUser } from '../../../repositories/admin_user';
import { AdminUserService } from '../../../services/admin/adminService';

let _router: ExpressRouter;
let _adminUserService: AdminUserService;

const AdminRouter = {
  init: function init(adminRouterConfig: AdminRouterConfig) {
    const { doctorsRouterConfig, hospitalsRepository, adminUsersRepository } =
      adminRouterConfig;

    _router = ExpressRouter();
    _adminUserService = new AdminUserService(adminUsersRepository);

    // @ts-ignore
    const checkAuthenticated = (req, res, next) => {
      if (
        req.isAuthenticated() &&
        req.session.passport.user.model == 'admin-user'
      ) {
        return next();
      }

      res.status(401).send({
        message:
          'Please login using email and password. Login endpoint: /api/admin/login.',
      });
    };

    const doctorsRouter = createDoctorRouter(doctorsRouterConfig);
    const hospitalsRouter = createHospitalRouter(hospitalsRepository);
    _router.use('/doctors', checkAuthenticated, doctorsRouter);
    _router.use('/hospitals', checkAuthenticated, hospitalsRouter);

    // Add authentication routes
    addAuthenticationRoutes(_router);

    _router.get('/', (req, res) => {
      _adminUserService
        .getAll()
        .then((adminUsers: AdminUser[]) => res.send(adminUsers).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.get('/:adminUserId', (req, res) => {
      const adminUserId = parseInt(req.params.adminUserId);
      _adminUserService
        .getById(adminUserId)
        .then((adminUser) => {
          if (adminUser) {
            res.send(adminUser).end();
          } else {
            res.status(404).send({ message: 'Admin user not found' }).end();
          }
        })
        .catch((err: Error) =>
          res.status(400).send({ message: err.message }).end()
        );
    });

    _router.get('/getByEmail/:email', (req, res) => {
      const email = req.params.email;
      _adminUserService
        .getByEmail(email)
        .then((adminUser) => {
          if (adminUser) {
            res.send(adminUser).end();
          } else {
            res.status(404).send({ message: 'Admin user not found' }).end();
          }
        })
        .catch((err: Error) =>
          res.status(400).send({ message: err.message }).end()
        );
    });

    _router.post('/', (req, res) => {
      const adminUser = {
        email: req.body.email,
        password: req.body.password,
      };

      _adminUserService
        .create(adminUser)
        .then((adminUserWithEncryptedPassword) =>
          res.status(201).send(adminUserWithEncryptedPassword).end()
        )
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.put('/:adminUserId', (req, res) => {
      const adminUserId = parseInt(req.params.adminUserId);
      _adminUserService
        .update(adminUserId, req.body)
        .then((data) => res.send(data.message).end())
        .catch((err: Error) =>
          res.status(400).send({ message: err.message }).end()
        );
    });

    _router.delete('/:adminUserId', (req, res) => {
      const adminUserId = parseInt(req.params.adminUserId);
      _adminUserService
        .delete(adminUserId)
        .then((data) => res.send(data.message).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });
  },

  getRouter: function getRouter() {
    return _router;
  },
};

type AdminRouterInterface = typeof AdminRouter;

function createAdminRouter(
  adminRouterConfig: AdminRouterConfig
): ExpressRouter {
  let router: AdminRouterInterface = Object.create(AdminRouter);
  router.init(adminRouterConfig);
  return router.getRouter();
}

export { createAdminRouter };
