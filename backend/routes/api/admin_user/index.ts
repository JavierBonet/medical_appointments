import { Router as ExpressRouter } from 'express';
import {
  AdminUser,
  AdminUserRepositoryInterface,
} from '../../../repositories/admin_user';

let _router: ExpressRouter;
let _patientsRepository: AdminUserRepositoryInterface;

const Router = {
  init: function init(patientsRepository: AdminUserRepositoryInterface) {
    _patientsRepository = patientsRepository;
    _router = ExpressRouter();

    _router.get('/', (req, res) => {
      _patientsRepository
        .getAll()
        .then((patients: AdminUser[]) => {
          res.send(patients).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.get('/:patientId', (req, res) => {
      const patientId = parseInt(req.params.patientId);
      _patientsRepository
        .getAdminUserById(patientId)
        .then((patient) => {
          if (patient) {
            res.send(patient).end();
          } else {
            res.status(404).send({ message: 'AdminUser not found' }).end();
          }
        })
        .catch((err: Error) => {
          res.status(400).send({ message: err.message }).end();
        });
    });

    _router.post('/', (req, res) => {
      _patientsRepository
        .createAdminUser(req.body)
        .then((patient) => {
          res.status(201).send(patient).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.put('/:patientId', (req, res) => {
      const patientId = parseInt(req.params.patientId);
      _patientsRepository
        .updateAdminUser(patientId, req.body)
        .then((data) => {
          res.send(data.message).end();
        })
        .catch((err: Error) => {
          res.status(400).send({ message: err.message }).end();
        });
    });

    _router.delete('/:patientId', (req, res) => {
      const patientId = parseInt(req.params.patientId);
      _patientsRepository
        .deleteAdminUser(patientId)
        .then((data) => {
          res.send(data.message).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });
  },
  getRouter: function getRouter() {
    return _router;
  },
};

type RouterInterface = typeof Router;

function createRouter(patientRepository: AdminUserRepositoryInterface) {
  let patientRouter: RouterInterface = Object.create(Router);
  patientRouter.init(patientRepository);
  return patientRouter.getRouter();
}

export { createRouter };
