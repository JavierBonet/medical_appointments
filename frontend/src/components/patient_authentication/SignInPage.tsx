import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../api/patients';
import useAuth from '../utils/useAuth';
import SignInForm from './SignInForm';

interface PropsInterface {
  user: LocalStorageUser | undefined;
  setUser: (user: LocalStorageUser) => void;
}

const initialPatient: LoginPatient = {
  email: '',
  password: '',
};

const SignInPage = ({ user, setUser }: PropsInterface) => {
  const [patient, setPatient] = useState(initialPatient);

  const navigate = useNavigate();

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
