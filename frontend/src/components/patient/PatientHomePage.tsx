import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

interface PropsInterface {
  user: LocalStorageUser | undefined;
  logout: () => void;
}

function PatientHomePage({ user, logout }: PropsInterface) {
  return (
    <>
      <Header user={user} logout={logout} />
      <Outlet />
    </>
  );
}

export default PatientHomePage;
