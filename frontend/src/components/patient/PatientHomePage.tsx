import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

interface Props {}

function PatientHomePage(props: Props) {
  const {} = props;

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default PatientHomePage;
