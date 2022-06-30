import { Router as ExpressRouter } from 'express';
import { Doctor } from '../../../../repositories/doctor';
import {
  Hospital,
  HospitalRepositoryInterface,
} from '../../../../repositories/hospital';

let _router: ExpressRouter;
let _hospitalsRepository: HospitalRepositoryInterface;

const HospitalRouter = {
  init: function init(hospitalsRepository: HospitalRepositoryInterface) {
    _hospitalsRepository = hospitalsRepository;
    _router = ExpressRouter();

    _router.get('/', (req, res) => {
      const includeDoctors = req.query.includeDoctors == 'true';
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
