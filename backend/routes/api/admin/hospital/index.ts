import { Router as ExpressRouter } from 'express';
import { Doctor } from '../../../../repositories/doctor';
import {
  Hospital,
  HospitalRepositoryInterface,
} from '../../../../repositories/hospital';

let _router: ExpressRouter;
let _hospitalsRepository: HospitalRepositoryInterface;

const Router = {
  init: function init(hospitalsRepository: HospitalRepositoryInterface) {
    _hospitalsRepository = hospitalsRepository;
    _router = ExpressRouter();

    _router.get('/', (req, res) => {
      const includeDoctors = req.query.includeDoctors;
      const options = includeDoctors ? { include: Doctor } : {};
      _hospitalsRepository
        .getAll(options)
        .then((hospitals: Hospital[]) => {
          res.send(hospitals).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.get('/:hospitalId', (req, res) => {
      const hospitalId = parseInt(req.params.hospitalId);
      _hospitalsRepository
        .getHospitalById(hospitalId)
        .then((hospital) => {
          if (hospital) {
            res.send(hospital).end();
          } else {
            res.status(404).send({ message: 'Hospital not found' }).end();
          }
        })
        .catch((err: Error) => {
          res.status(400).send({ message: err.message }).end();
        });
    });

    _router.post('/', (req, res) => {
      _hospitalsRepository
        .createHospital(req.body)
        .then((hospital) => {
          res.status(201).send(hospital).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.put('/:hospitalId', (req, res) => {
      const hospitalId = parseInt(req.params.hospitalId);
      _hospitalsRepository
        .updateHospital(hospitalId, req.body)
        .then((data) => {
          res.send(data.message).end();
        })
        .catch((err: Error) => {
          res.status(400).send({ message: err.message }).end();
        });
    });

    _router.delete('/:hospitalId', (req, res) => {
      const hospitalId = parseInt(req.params.hospitalId);
      _hospitalsRepository
        .deleteHospital(hospitalId)
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

function createRouter(hospitalRepository: HospitalRepositoryInterface) {
  let hospitalRouter: RouterInterface = Object.create(Router);
  hospitalRouter.init(hospitalRepository);
  return hospitalRouter.getRouter();
}

export { createRouter };
