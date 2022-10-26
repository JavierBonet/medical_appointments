import { Router as ExpressRouter } from 'express';
import { Appointment } from '../../../repositories/appointment';
import { createAppointmentRouter } from './appointment/appointmentRouter';
import { createDoctorRouter } from './doctor/doctorRouter';
import { createHospitalRouter } from './hospital/hospitalRouter';
import { createCalendarRouter } from './calendar/calendarRouter';
import { Patient } from '../../../repositories/patient';
import { addAuthenticationRoutes } from './authenticationRoutes';
import { PatientsRouterConfig } from '../../../types/global';
import { PatientService } from '../../../services/patient/patientService';

let _router: ExpressRouter;
let _patientService: PatientService;

const PatientRouter = {
  init: function init({
    patientsRepository,
    appointmentsRepository,
    doctorsRepository,
    hospitalsRepository,
    calendarsRepository,
  }: PatientsRouterConfig) {
    _patientService = new PatientService(patientsRepository);
    _router = ExpressRouter();

    // @ts-ignore
    const checkAuthenticated = (req, res, next) => {
      if (
        req.isAuthenticated() &&
        req.session.passport.user.model == 'patient'
      ) {
        return next();
      }

      res.status(401).send({
        message:
          'Please login using email and password. Login endpoint: /api/patients/login.',
      });
    };

    const appointmentRouter = createAppointmentRouter(appointmentsRepository);
    const doctorRouter = createDoctorRouter(doctorsRepository);
    const hospitalRouter = createHospitalRouter(hospitalsRepository);
    const calendarRouter = createCalendarRouter(calendarsRepository);
    // checkAuthenticated verifies that a user is logged in to access
    // appointments, doctors and hospitals routes
    _router.use('/appointments', checkAuthenticated, appointmentRouter);
    _router.use('/doctors', checkAuthenticated, doctorRouter);
    _router.use('/hospitals', checkAuthenticated, hospitalRouter);
    _router.use('/calendar', checkAuthenticated, calendarRouter);

    // Add authentication routes
    addAuthenticationRoutes(_router);

    _router.get('/', (req, res) => {
      const includeAppointments = req.query.includeAppointments;
      const options = includeAppointments ? { include: Appointment } : {};
      _patientService
        .getAll(options)
        .then((patients: Patient[]) => res.send(patients).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.get('/:patientId', (req, res) => {
      const patientId = parseInt(req.params.patientId);
      _patientService
        .get(patientId, { include: Appointment })
        .then((patient) => {
          if (patient) {
            res.send(patient).end();
          } else {
            res.status(404).send({ message: 'Patient not found' }).end();
          }
        })
        .catch((err: Error) =>
          res.status(400).send({ message: err.message }).end()
        );
    });

    _router.get('/getByEmail/:email', (req, res) => {
      const email = req.params.email;
      _patientService
        .getByEmail(email)
        .then((patient) => {
          if (patient) {
            res.send(patient).end();
          } else {
            res.status(404).send({ message: 'Patient not found' }).end();
          }
        })
        .catch((err: Error) =>
          res.status(400).send({ message: err.message }).end()
        );
    });

    _router.post('/', async (req, res) => {
      const patient = {
        email: req.body.email,
        password: req.body.password,
      };

      _patientService
        .create(patient)
        .then((_patient) => res.status(201).send(_patient).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });

    _router.put('/:patientId', (req, res) => {
      const patientId = parseInt(req.params.patientId);
      _patientService
        .update(patientId, req.body)
        .then((data) => res.send(data.message).end())
        .catch((err: Error) =>
          res.status(400).send({ message: err.message }).end()
        );
    });

    _router.delete('/:patientId', (req, res) => {
      const patientId = parseInt(req.params.patientId);
      _patientService
        .delete(patientId)
        .then((data) => res.send(data.message).end())
        .catch((err: Error) => res.status(400).send(err.message).end());
    });
  },
  getRouter: function getRouter() {
    return _router;
  },
};

type RouterInterface = typeof PatientRouter;

function createPatientRouter(patientsRouterConfig: PatientsRouterConfig) {
  let patientRouter: RouterInterface = Object.create(PatientRouter);
  patientRouter.init(patientsRouterConfig);
  return patientRouter.getRouter();
}

export { createPatientRouter };
