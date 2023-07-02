import { Request, Router as ExpressRouter } from 'express';
import { DoctorRepositoryInterface } from '../../../../../../repositories/doctor';
import { HospitalAssociationsService } from '../../../../../../services/admin/hospitalAssociationsService';

let _router: ExpressRouter;
let _hospitalAssociationsService: HospitalAssociationsService;

const HospitalAssociationsRouter = {
  init: function init(doctorsRepository: DoctorRepositoryInterface) {
    _hospitalAssociationsService = new HospitalAssociationsService(doctorsRepository);
    _router = ExpressRouter({ mergeParams: true });

    _router.post('/:hospitalId', (req: Request<{ doctorId: string; hospitalId: string }>, res) => {
      const doctorId = parseInt(req.params.doctorId);
      const hospitalId = parseInt(req.params.hospitalId);
      _hospitalAssociationsService.create(hospitalId, doctorId);
    });

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
        _hospitalAssociationsService.update(previousHospitalId, hospitalId, doctorId);
      }
    );
  },
  getRouter: function getRouter() {
    return _router;
  },
};

type RouterInterface = typeof HospitalAssociationsRouter;

function createHospitalAssociationsRouter(doctorsRepository: DoctorRepositoryInterface) {
  let hospitalAssociationsRouter: RouterInterface = Object.create(HospitalAssociationsRouter);
  hospitalAssociationsRouter.init(doctorsRepository);
  return hospitalAssociationsRouter.getRouter();
}

export { createHospitalAssociationsRouter };
