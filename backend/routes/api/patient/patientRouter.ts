import { Router as ExpressRouter } from 'express';
import { Appointment } from '../../../repositories/appointment';
import { createAppointmentRouter } from './appointment/appointmentRouter';
import {
  Patient,
  PatientRepositoryInterface,
} from '../../../repositories/patient';
import { addAuthenticationRoutes } from './authenticationRoutes';
import { hash } from 'bcrypt';
import { PatientsRouterConfig } from '../../../types/global';

const SALT_ROUNDS = 10;

let _router: ExpressRouter;
let _patientsRepository: PatientRepositoryInterface;

const PatientRouter = {
  init: function init({
    patientsRepository,
    appointmentsRepository,
  }: PatientsRouterConfig) {
    _patientsRepository = patientsRepository;
    _router = ExpressRouter();

    // @ts-ignore
    const checkAuthenticated = (req, res, next) => {
      if (
        req.isAuthenticated() &&
        req.session.passport.user.model == 'patient'
      ) {
        return next();
      }

      res.status(400).send({
        message:
          'Please login using email and password. Login endpoint: /api/patients/login.',
      });
    };

    const appointmentRouter = createAppointmentRouter(appointmentsRepository);
    // checkAuthenticated verifies that a user is logged in to access
    // appointments routes
    _router.use(
      '/:patientId/appointments',
      checkAuthenticated,
      appointmentRouter
    );

    // Add authentication routes
    addAuthenticationRoutes(_router);

    _router.get('/', (req, res) => {
      const includeAppointments = req.query.includeAppointments;
      const options = includeAppointments ? { include: Appointment } : {};
      _patientsRepository
        .getAll(options)
        .then((patients: Patient[]) => {
          res.send(patients).end();
        })
        .catch((err: Error) => {
          res.status(400).send(err.message).end();
        });
    });

    _router.get('/:patientId', (req, res) => {
      const patientId = parseInt(req.params.patientId);
      _patientsRepository
        .getPatientById(patientId, { include: Appointment })
        .then((patient) => {
          if (patient) {
            res.send(patient).end();
          } else {
            res.status(404).send({ message: 'Patient not found' }).end();
          }
        })
        .catch((err: Error) => {
          res.status(400).send({ message: err.message }).end();
        });
    });

    _router.get('/getByEmail/:email', (req, res) => {
      const email = req.params.email;
      _patientsRepository
        .getPatientByEmail(email)
        .then((patient) => {
          if (patient) {
            res.send(patient).end();
          } else {
            res.status(404).send({ message: 'Patient not found' }).end();
          }
        })
        .catch((err: Error) => {
          res.status(400).send({ message: err.message }).end();
        });
    });

    _router.post('/', (req, res) => {
      let patientWithEncryptedPassword = {
        email: req.body.email,
        password: '',
      };
      const plainPassword = req.body.password;
      hash(plainPassword, SALT_ROUNDS, function (err, hash) {
        patientWithEncryptedPassword.password = hash;
        _patientsRepository
          .createPatient(patientWithEncryptedPassword)
          .then((patient) => {
            res.status(201).send(patient).end();
          })
          .catch((err: Error) => {
            res.status(400).send(err.message).end();
          });
      });
    });

    _router.put('/:patientId', (req, res) => {
      const patientId = parseInt(req.params.patientId);
      _patientsRepository
        .updatePatient(patientId, req.body)
        .then((data) => {
          res.send(data.message).end();
        })
        .catch((err: Error) => {
          res.status(400).send({ message: err.message }).end();
        });
    });

    _router.delete('/:patientId', (req, res) => {
      const patientId = parseInt(req.params.patientId);
      _patientsRepository
        .deletePatient(patientId)
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

type RouterInterface = typeof PatientRouter;

function createPatientRouter(patientsRouterConfig: PatientsRouterConfig) {
  let patientRouter: RouterInterface = Object.create(PatientRouter);
  patientRouter.init(patientsRouterConfig);
  return patientRouter.getRouter();
}

export { createPatientRouter };
