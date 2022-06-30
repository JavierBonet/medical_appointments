import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../../api/admin/user';
import SignInForm from './SignInForm';

const initialPatient: LoginAdminUser = {
  email: '',
  password: '',
};

interface PropsInterface {
  adminUser: LocalStorageAdminUser | undefined;
  setAdminUser: (adminUser: LocalStorageAdminUser) => void;
}

const SignInPage = ({ adminUser, setAdminUser }: PropsInterface) => {
  const [currentUser, setCurrentUser] = useState(initialPatient);

  const navigate = useNavigate();

  useEffect(() => {
    if (adminUser) {
      toast.info('You have already logged in');
      navigate('/admin');
    }
  }, []);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    let { name, value } = event.target;
    let newPatient = { ...currentUser, [name]: value };
    setCurrentUser(newPatient);
  }

  function submitHandler() {
    login(currentUser).then((loginSucceed) => {
      if (loginSucceed) {
        setAdminUser({ name: currentUser.email });
        toast.success('Logged in successfully');
        navigate('/admin');
      } else {
        toast.warn('Username or password are wrong');
      }
    });
  }

  return (
    <div className="section-container">
      <h1>Admin log in</h1>
      <SignInForm
        currentUser={currentUser}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />
    </div>
  );
};

export default SignInPage;
