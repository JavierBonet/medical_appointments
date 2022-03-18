import { Router as ExpressRouter } from 'express';
import { Appointment } from '../../../repositories/appointment';
import {
  Doctor,
  DoctorRepositoryInterface,
} from '../../../repositories/doctor';
import { DoctorsConfig } from '../../../types/global';
import { createRouter as createAppointmentsRouter } from './appointment';
import { createRouter as createCalendarsRouter } from './calendar';

let _router: ExpressRouter;
let _doctorsRepository: DoctorRepositoryInterface;

const Router = {
  init: function init({
    doctorsRepository,
    appointmentsRepository,
    calendarsConfig,
  }: DoctorsConfig) {
    _doctorsRepository = doctorsRepository;
    _router = ExpressRouter({ mergeParams: true });

    const appointmentsRouter = createAppointmentsRouter(appointmentsRepository);
    const calendarsRouter = createCalendarsRouter(calendarsConfig);
    _router.use('/:doctorId/appointments', appointmentsRouter);
    _router.use('/:doctorId/calendars', calendarsRouter);

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
        .getDoctorById(doctorId)
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

type RouterInterface = typeof Router;

function createRouter(doctorsRepositories: DoctorsConfig) {
  let doctorRouter: RouterInterface = Object.create(Router);
  doctorRouter.init(doctorsRepositories);
  return doctorRouter.getRouter();
}

export { createRouter };
