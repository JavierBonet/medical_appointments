import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../api/patients';
import useAuth from '../../routes/useAuth';
import SignInForm from './SignInForm';

const initialPatient: LoginPatient = {
  email: '',
  password: '',
};

const SignInPage = () => {
  const { user, setUser } = useAuth();

  const [patient, setPatient] = useState(initialPatient);

  const navigate = useNavigate();

  let isLoggedIn = false;

  useEffect(() => {
    if (user) {
      toast.info('You have already logged in');
      navigate('/patients');
    }
  }, []);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    let { name, value } = event.target;
    let newPatient = { ...patient, [name]: value };
    setPatient(newPatient);
  }

  function submitHandler() {
    login(patient).then((loginSucceed) => {
      if (loginSucceed) {
        setUser({ name: patient.email });
        toast.success('Logged in successfully');
        navigate(-1);
      } else {
        toast.warn('Email or password are wrong');
      }
    });
  }

  return (
    <div className="section-container">
      <h1>Log in</h1>
      <SignInForm
        patient={patient}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />
    </div>
  );
};

export default SignInPage;
