import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { AdminUserRepositoryInterface } from './repositories/admin_user';
import { PatientRepositoryInterface } from './repositories/patient';
import bcrypt from 'bcrypt';

export default function authenticationConfig(
  passport: PassportStatic,
  patientsRepository: PatientRepositoryInterface,
  adminUsersRepository: AdminUserRepositoryInterface
) {
  passport.use(
    'patient-login',
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      patientsRepository
        .getPatientByEmail(email)
        .then((patient) => {
          if (patient) {
            bcrypt
              .compare(password, patient.password)
              .then((areEqual) => {
                if (areEqual) {
                  done(null, { model: 'patient', id: patient.id });
                } else {
                  done(null, false);
                }
              })
              .catch((error) => {
                done(error, false);
              });
          } else {
            done(null, false);
          }
        })
        .catch((error) => done(error, false));
    })
  );

  passport.use(
    'admin-login',
    new LocalStrategy((email, password, done) => {
      adminUsersRepository
        .getPatientByEmail(email)
        .then((adminUser) => {
          if (adminUser) {
            bcrypt
              .compare(password, adminUser.password)
              .then((areEqual) => {
                if (areEqual) {
                  done(null, { model: 'admin-user', id: adminUser.id });
                } else {
                  done(null, false);
                }
              })
              .catch((error) => {
                done(error, false);
              });
          } else {
            done(null, false);
          }
        })
        .catch((error) => done(error, false));
    })
  );

  passport.serializeUser((userObject, done) => {
    done(null, userObject);
  });

  passport.deserializeUser((userObject, done) => {
    // @ts-ignore
    const { model, id } = userObject;

    if (model == 'patient') {
      patientsRepository
        .getPatientById(id)
        .then((patient) => {
          if (patient) {
            done(null, patient);
          } else {
            done(null, false);
          }
        })
        .catch((err) => {
          done(err, false);
        });
    } else if (model == 'admin-user') {
      adminUsersRepository
        .getAdminUserById(id)
        .then((adminUser) => {
          if (adminUser) {
            done(null, adminUser);
          } else {
            done(null, false);
          }
        })
        .catch((err) => {
          done(err, false);
        });
    }
  });
}
