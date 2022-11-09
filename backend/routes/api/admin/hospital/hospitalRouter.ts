import { Router as ExpressRouter } from 'express';
import { Doctor } from '../../../../repositories/doctor';
import {
  Hospital,
  HospitalRepositoryInterface,
} from '../../../../repositories/hospital';
import { HospitalService } from '../../../../services/admin/hospitalService';

let _router: ExpressRouter;
let _hospitalService: HospitalService;

const HospitalRouter = {
  init: function init(hospitalsRepository: HospitalRepositoryInterface) {
    _hospitalService = new HospitalService(hospitalsRepository);
    _router = ExpressRouter();

    _router.get('/', (req, res) => {
      const includeDoctors = req.query.includeDoctors == 'true';
      const options = includeDoctors ? { include: Doctor } : {};
      _hospitalService
        .getAll(options)
        .then((hospitals: Hospital[]) => res.send(hospitals).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.get('/:hospitalId', (req, res) => {
      const hospitalId = parseInt(req.params.hospitalId);
      _hospitalService
        .getById(hospitalId)
        .then((hospital) => {
          if (hospital) {
            res.send(hospital).end();
          } else {
            res.status(404).send({ message: 'Hospital not found' }).end();
          }
        })
        .catch((err: Error) =>
          res.status(400).send({ message: err.message }).end()
        );
    });

    _router.post('/', (req, res) => {
      _hospitalService
        .create(req.body)
        .then((hospital) => res.status(201).send(hospital).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.put('/:hospitalId', (req, res) => {
      const hospitalId = parseInt(req.params.hospitalId);
      _hospitalService
        .update(hospitalId, req.body)
        .then((data) => res.send(data.message).end())
        .catch((err: Error) =>
          res.status(400).send({ message: err.message }).end()
        );
    });

    _router.delete('/:hospitalId', (req, res) => {
      const hospitalId = parseInt(req.params.hospitalId);
      _hospitalService
        .delete(hospitalId)
        .then((data) => res.send(data.message).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });
  },
  getRouter: function getRouter() {
    return _router;
  },
};

type RouterInterface = typeof HospitalRouter;

function createHospitalRouter(hospitalRepository: HospitalRepositoryInterface) {
  let hospitalRouter: RouterInterface = Object.create(HospitalRouter);
  hospitalRouter.init(hospitalRepository);
  return hospitalRouter.getRouter();
}

export { createHospitalRouter };
