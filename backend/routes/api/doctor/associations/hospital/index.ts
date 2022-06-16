import { DoctorRepositoryInterface } from '../../../../../repositories/doctor';

import { Request, Router as ExpressRouter } from 'express';

let _router: ExpressRouter;
let _doctorsRepository: DoctorRepositoryInterface;

const Router = {
  init: function init(doctorsRepository: DoctorRepositoryInterface) {
    _doctorsRepository = doctorsRepository;
    _router = ExpressRouter({ mergeParams: true });

    _router.post(
      '/:hospitalId',
      (req: Request<{ doctorId: string; hospitalId: string }>, res) => {
        const doctorId = parseInt(req.params.doctorId);
        const hospitalId = parseInt(req.params.hospitalId);
        _doctorsRepository.addHospitalAssociation(hospitalId, doctorId);
      }
    );

    _router.put(
      '/:previousHospitalId/:hospitalId',
      (
        req: Request<{
          doctorId: string;
          hospitalId: string;
          previousHospitalId: string;
        }>,
        res
      ) => {
        const doctorId = parseInt(req.params.doctorId);
        const hospitalId = parseInt(req.params.hospitalId);
        const previousHospitalId = parseInt(req.params.previousHospitalId);
        _doctorsRepository.replaceHospitalAssociation(
          previousHospitalId,
          hospitalId,
          doctorId
        );
      }
    );
  },
  getRouter: function getRouter() {
    return _router;
  },
};

type RouterInterface = typeof Router;

function createRouter(doctorsRepository: DoctorRepositoryInterface) {
  let hospitalAssociationsRouter: RouterInterface = Object.create(Router);
  hospitalAssociationsRouter.init(doctorsRepository);
  return hospitalAssociationsRouter.getRouter();
}

export { createRouter };
