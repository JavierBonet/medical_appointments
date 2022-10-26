import { Router as ExpressRouter } from 'express';
import { Appointment } from '../../../../repositories/appointment';
import {
  Doctor,
  DoctorRepositoryInterface,
} from '../../../../repositories/doctor';
import { DoctorService } from '../../../../services/patient/doctorService';

let _router: ExpressRouter;
let _doctorService: DoctorService;

const DoctorRouter = {
  init: function init(doctorsRepository: DoctorRepositoryInterface) {
    _doctorService = new DoctorService(doctorsRepository);
    _router = ExpressRouter({ mergeParams: true });

    _router.get('/', (req, res) => {
      _doctorService
        .getAll({ include: Appointment })
        .then((doctors: Doctor[]) => res.send(doctors).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });
  },

  getRouter: function getRouter() {
    return _router;
  },
};

type RouterInterface = typeof DoctorRouter;

function createDoctorRouter(doctorsRepository: DoctorRepositoryInterface) {
  let doctorRouter: RouterInterface = Object.create(DoctorRouter);
  doctorRouter.init(doctorsRepository);
  return doctorRouter.getRouter();
}

export { createDoctorRouter };
