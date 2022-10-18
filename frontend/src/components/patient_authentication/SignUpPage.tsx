import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SignUpForm from './SignUpForm';
import CustomLoader from '../commons/CustomLoader';
import { doesPatientAlreadyExist, savePatient } from '../../api/patients';

const initialPatient: OptionalPatient = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

const defaultErrors: PatientErrors = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

const SingUpPage = () => {
  const [patient, setPatient] = useState(initialPatient);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<PatientErrors>({ ...defaultErrors });
  const navigate = useNavigate();

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    let newPatient = { ...patient };
    // As this function will only be invoked with email and password fields, I ignore ts checks
    // @ts-ignore
    newPatient[name] = value;
    updateErrors(newPatient);
    setPatient(newPatient);
  }

  function submitHandler() {
    const errors = updateErrors(patient);

    if (!existErrors(errors)) {
      setLoading(true);
      doesPatientAlreadyExist(patient.email).then((itExist) => {
        if (itExist) {
          toast.info('Patient already registered. Please log in');
          navigate('/patient/signin');
        } else {
          let dbPatient: OptionalDbPatient = {
            email: patient.email,
            password: patient.password,
          };

          savePatient(dbPatient)
            .then((message) => {
              toast.success(message);
              navigate('/');
            })
            .catch((err: Error) => {
              toast.error(err.message);
            })
            .finally(() => setLoading(false));
        }
      });
    }
  }

  function existErrors(errors: PatientErrors): boolean {
    let existErrors = false;

    for (const key in errors) {
      // @ts-ignore
      if (errors[key]) {
        existErrors = true;
        break;
      }
    }

    return existErrors;
  }

  function updateErrors(patient: OptionalPatient): PatientErrors {
    let newErrors = { ...defaultErrors };

    newErrors.email = getEmailError(patient.email);

    newErrors.password = getPasswordError(patient.password);

    newErrors.passwordConfirmation = getPasswordConfirmationError(patient);

    setErrors(newErrors);
    return newErrors;
  }

  function getEmailError(email: string): string {
    let error = '';
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email) {
      error = 'You should set an email';
    } else if (!emailRegex.test(email)) {
      error = 'The email format should be like example@something.xyz';
    }

    return error;
  }

  function getPasswordError(password: string): string {
    let error = '';

    if (!password) {
      error = 'You should set a password';
    } else if (password.length < 6) {
      error = 'Password must have at least 6 characters';
    }

    return error;
  }

  function getPasswordConfirmationError(patient: OptionalPatient): string {
    let error = '';

    if (patient.password != patient.passwordConfirmation) {
      error = 'Passwords should match';
    }

    return error;
  }

  return (
    <div className="section-container">
      <CustomLoader loading={loading} />
      <SignUpForm
        patient={patient}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        errors={errors}
      />{' '}
    </div>
  );
};

export default SingUpPage;
