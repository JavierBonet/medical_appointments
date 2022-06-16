import passport from 'passport';
import { Router } from 'express';

export function addAuthenticationRoutes(router: Router) {
  router.post(
    '/login',
    // I include this verification to check if the body
    // is being sent including the email and password fields
    (req, res, next) => {
      if (Object.keys(req.body).length == 0) {
        res.status(400).send({
          message: 'A body must be provided.',
        });
      } else {
        if (!req.body.email || !req.body.password) {
          res.status(400).send({
            message: 'An email and password must be provided.',
          });
        } else {
          next();
        }
      }
    },
    (req, res, next) => {
      passport.authenticate('patient-login', {
        failureRedirect: '/api/patients/loginFailed',
        successRedirect: '/api/patients/loginSucceed',
      })(req, res, next);
    }
  );

  router.get('/loginSucceed', (req, res) => {
    res.send({ message: 'Successfully loged in!' });
  });

  // Just informing that the patient couldn't be found
  router.get('/loginFailed', (req, res) => {
    res.status(404).send({ message: 'Email or password are wrong.' });
  });
}
