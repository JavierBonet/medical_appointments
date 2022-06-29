import { Router as ExpressRouter } from 'express';
import { Appointment } from '../../../../repositories/appointment';
import { Calendar } from '../../../../repositories/calendar';
import {
  Doctor,
  DoctorRepositoryInterface,
} from '../../../../repositories/doctor';
import { DoctorsRouterConfig } from '../../../../types/global';
import { createCalendarRouter } from './calendar/calendarRouter';
import { createHospitalAssociationsRouter } from './associations/hospital/hospitalAssociationsRouter';

let _router: ExpressRouter;
let _doctorsRepository: DoctorRepositoryInterface;

const DoctorRouter = {
  init: function init({
    doctorsRepository,
    calendarsRouterConfig,
  }: DoctorsRouterConfig) {
    _doctorsRepository = doctorsRepository;
    _router = ExpressRouter({ mergeParams: true });

    const calendarRouter = createCalendarRouter(calendarsRouterConfig);
    const hospitalAssociationsRouter =
      createHospitalAssociationsRouter(doctorsRepository);

    _router.use('/:doctorId/calendars', calendarRouter);
    _router.use(
      '/:doctorId/associations/hospitals',
      hospitalAssociationsRouter
    );

    _router.get('/', (req, res) => {
      _doctorsRepository
        .getAll({ include: Appointment })
        .then((doctors: Doctor[]) => {
          res.send(doctors).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.get('/:doctorId', (req, res) => {
      const doctorId = parseInt(req.params.doctorId);
      _doctorsRepository
        .getDoctorById(doctorId, { include: Calendar })
        .then((doctor) => {
          if (doctor) {
            res.send(doctor).end();
          } else {
            res.status(404).send({ message: 'Doctor not found' }).end();
          }
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.post('/', (req, res) => {
      _doctorsRepository
        .createDoctor(req.body)
        .then((doctor) => {
          res.status(201).send(doctor).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.put('/:doctorId', (req, res) => {
      const doctorId = parseInt(req.params.doctorId);
      _doctorsRepository
        .updateDoctor(doctorId, req.body)
        .then((data) => {
          res.send(data.message).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.delete('/:doctorId', (req, res) => {
      const doctorId = parseInt(req.params.doctorId);
      _doctorsRepository
        .deleteDoctor(doctorId)
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

type RouterInterface = typeof DoctorRouter;

function createDoctorRouter(doctorsConfig: DoctorsRouterConfig) {
  let doctorRouter: RouterInterface = Object.create(DoctorRouter);
  doctorRouter.init(doctorsConfig);
  return doctorRouter.getRouter();
}

export { createDoctorRouter };
