import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
// TODO: REMOVE THIS AS WE ARE NO LONGER USING APPOINTMETS AS
// A SEPARATE PAGE, IT DEPENDS ON PATIENTS
import Header from '../patient/Header';

const AppointmentsHome = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AppointmentsHome;
