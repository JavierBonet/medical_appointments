import { Request, Router as ExpressRouter } from 'express';
import {
  Appointment,
  AppointmentRepositoryInterface,
} from '../../../../repositories/appointment';
import { Doctor } from '../../../../repositories/doctor';
import { Hospital } from '../../../../repositories/hospital';

let _router: ExpressRouter;
let _appointmentsRepository: AppointmentRepositoryInterface;

const Router = {
  init: function init(appointmentsRepository: AppointmentRepositoryInterface) {
    _appointmentsRepository = appointmentsRepository;
    _router = ExpressRouter({ mergeParams: true });

    _router.get('/', (req: Request<{ patientId: string }>, res) => {
      _appointmentsRepository
        .getAll()
        .then((appointments: Appointment[]) => {
          res.send(appointments).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.get('/:appointmentId', (req, res) => {
      const appointmentId = parseInt(req.params.appointmentId);
      _appointmentsRepository
        .getAppointmentById(appointmentId, { include: [Doctor, Hospital] })
        .then((appointment) => {
          if (appointment) {
            res.send(appointment).end();
          } else {
            res.status(404).send({ message: 'Appointment not found' }).end();
          }
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.post('/', (req, res) => {
      _appointmentsRepository
        .createAppointment(req.body)
        .then((appointment) => {
          res.status(201).send(appointment).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.put('/:appointmentId', (req, res) => {
      const appointmentId = parseInt(req.params.appointmentId);
      _appointmentsRepository
        .updateAppointment(appointmentId, req.body)
        .then((data) => {
          res.send(data.message).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.delete('/:appointmentId', (req, res) => {
      const appointmentId = parseInt(req.params.appointmentId);
      _appointmentsRepository
        .deleteAppointment(appointmentId)
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

function createRouter(appointmentRepository: AppointmentRepositoryInterface) {
  let appointmentRouter: RouterInterface = Object.create(Router);
  appointmentRouter.init(appointmentRepository);
  return appointmentRouter.getRouter();
}

export { createRouter };
