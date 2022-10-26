import { Router as ExpressRouter } from 'express';
import { Doctor } from '../../../../repositories/doctor';
import {
  Hospital,
  HospitalRepositoryInterface,
} from '../../../../repositories/hospital';
import { HospitalService } from '../../../../services/patient/hospitalService';

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
