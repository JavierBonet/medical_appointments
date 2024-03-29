import { Request, Router as ExpressRouter } from 'express';
import {
  Appointment,
  AppointmentRepositoryInterface,
} from '../../../../repositories/appointment';
import { Doctor } from '../../../../repositories/doctor';
import { Hospital } from '../../../../repositories/hospital';
import { AppointmentService } from '../../../../services/patient/appointmentService';

let _router: ExpressRouter;
let _appointmentService: AppointmentService;

const AppointmentRouter = {
  init: function init(appointmentsRepository: AppointmentRepositoryInterface) {
    _appointmentService = new AppointmentService(appointmentsRepository);
    _router = ExpressRouter({ mergeParams: true });

    _router.get('/', (req, res) => {
      _appointmentService
        .getAll({ include: [Doctor, Hospital] })
        .then((appointments: Appointment[]) => res.send(appointments).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.get('/:hospitalId/:doctorId', (req, res) => {
      const hospitalId = parseInt(req.params.hospitalId);
      const doctorId = parseInt(req.params.doctorId);

      _appointmentService
        .getAllByHospitalAndDoctor(hospitalId, doctorId)
        .then((appointments: Appointment[]) => res.send(appointments).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.get('/:appointmentId', (req, res) => {
      const appointmentId = parseInt(req.params.appointmentId);
      _appointmentService
        .getAppointmentById(appointmentId, { include: [Doctor, Hospital] })
        .then((appointment) => {
          if (appointment) {
            res.send(appointment).end();
          } else {
            res.status(404).send({ message: 'Appointment not found' }).end();
          }
        })
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.post('/', (req: any, res) => {
      const patientId = req.session.passport.user.id as number;

      if (!patientId) {
        res.status(500).send({ message: 'User not logged in!!!' }).end();
      }

      // Set the patientId field using current user's id
      const appointment = { ...req.body, patientId };

      _appointmentService
        .create(appointment)
        .then((dbAppointment) => res.status(201).send(dbAppointment).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.put('/:appointmentId', (req, res) => {
      const appointmentId = parseInt(req.params.appointmentId);
      _appointmentService
        .update(appointmentId, req.body)
        .then((data) => res.send(data.message).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.delete('/:appointmentId', (req, res) => {
      const appointmentId = parseInt(req.params.appointmentId);
      _appointmentService
        .delete(appointmentId)
        .then((data) => res.send(data.message).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });
  },
  getRouter: function getRouter() {
    return _router;
  },
};

type RouterInterface = typeof AppointmentRouter;

function createAppointmentRouter(
  appointmentRepository: AppointmentRepositoryInterface
) {
  let appointmentRouter: RouterInterface = Object.create(AppointmentRouter);
  appointmentRouter.init(appointmentRepository);
  return appointmentRouter.getRouter();
}

export { createAppointmentRouter };
