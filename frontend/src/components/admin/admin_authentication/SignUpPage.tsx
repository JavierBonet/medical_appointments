import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SignUpForm from './SignUpForm';
import CustomLoader from '../../commons/CustomLoader';
import { doesAdminUserAlreadyExist, saveAdminUser } from '../../../api/admin/user';

const initialAdminUser: OptionalAdminUser = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

const defaultErrors: AdminUserErrors = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

const SingUpPage = () => {
  const [adminUser, setAdminUser] = useState(initialAdminUser);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AdminUserErrors>({ ...defaultErrors });
  const navigate = useNavigate();

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    const newAdminUser = { ...adminUser };
    // @ts-expect-error As this function will only be invoked with email and password fields, I ignore ts checks
    newAdminUser[name] = value;
    updateErrors(newAdminUser);
    setAdminUser(newAdminUser);
  }

  function submitHandler() {
    const errors = updateErrors(adminUser);

    if (!existErrors(errors)) {
      setLoading(true);
      doesAdminUserAlreadyExist(adminUser.email).then((exists) => {
        if (exists) {
          toast.info('Admin user already registered. Please log in');
          navigate('/admin/signin');
        } else {
          const dbAdminUser: OptionalDbAdminUser = {
            email: adminUser.email,
            password: adminUser.password,
          };

          saveAdminUser(dbAdminUser)
            .then((message) => {
              toast.success(message);
              navigate('/admin');
            })
            .catch((err: Error) => {
              toast.error(err.message);
            })
            .finally(() => setLoading(false));
        }
      });
    }
  }

  function existErrors(errors: AdminUserErrors): boolean {
    let existErrors = false;

    for (const key in errors) {
      // @ts-expect-error 'key' is an errors key
      if (errors[key]) {
        existErrors = true;
        break;
      }
    }

    return existErrors;
  }

  function updateErrors(adminUser: OptionalAdminUser): AdminUserErrors {
    const newErrors = { ...defaultErrors };

    newErrors.email = getEmailError(adminUser.email);

    newErrors.password = getPasswordError(adminUser.password);

    newErrors.passwordConfirmation = getPasswordConfirmationError(adminUser);

    setErrors(newErrors);
    return newErrors;
  }

  function getEmailError(email: string): string {
    let error = '';
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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

  function getPasswordConfirmationError(adminUser: OptionalAdminUser): string {
    let error = '';

    if (adminUser.password !== adminUser.passwordConfirmation) {
      error = 'Passwords should match';
    }

    return error;
  }

  return (
    <div className="section-container">
      <CustomLoader loading={loading} />
      <SignUpForm
        adminUser={adminUser}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        errors={errors}
      />{' '}
    </div>
  );
};

export default SingUpPage;
