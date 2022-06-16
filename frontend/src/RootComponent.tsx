import React, { useState } from 'react';
import { AppContext } from './lib/context';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import HospitalsPage from './components/admin/hospital/HospitalsPage';
import DoctorsPage from './components/admin/doctor/DoctorsPage';
import AdminPage from './components/admin/Admin';
import AdminHome from './components/admin/AdminHome';
import HospitalPage from './components/admin/hospital/HospitalPage';
import DoctorPage from './components/admin/doctor/DoctorPage';
import CalendarsPage from './components/admin/doctor/calendar/CalendarsPage';
import CalendarPage from './components/admin/doctor/calendar/CalendarPage';
import AppointmentPage from './components/appointment/AppointmentPage';
import AppointmentsHome from './components/appointment/AppointmentsHome';
import SignUpPage from './components/patient_authentication/SignUpPage';
import SignInPage from './components/patient_authentication/SignInPage';
import PatientAuthRoute from './routes/PatientAuthRoute';
import Header from './components/patient/Header';
import PatientHomePage from './components/patient/PatientHomePage';

const RootComponent = () => {
  const [isPatientAuthenticated, setIsPatientAuthenticated] = useState(false);

  return (
    <>
      <AppContext.Provider
        value={{ isPatientAuthenticated, setIsPatientAuthenticated }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/admin" element={<AdminPage />}>
              <Route index element={<AdminHome />} />
              <Route path="hospitals" element={<HospitalsPage />} />
              <Route path="hospital/:hospitalId" element={<HospitalPage />} />
              <Route path="hospital" element={<HospitalPage />} />
              <Route path="doctors" element={<DoctorsPage />} />
              <Route path="doctor/:doctorId" element={<DoctorPage />}>
                <Route index element={<CalendarsPage />} />
                <Route path="calendars" element={<CalendarsPage />} />
                <Route path="calendar/:calendarId" element={<CalendarPage />} />
                <Route path="calendar" element={<CalendarPage />} />
              </Route>
              <Route path="doctor" element={<DoctorPage />} />
            </Route>

            {/*
              /patients
                header <---- < home | appointments????
            
            */}

            <Route path="/patients" element={<PatientHomePage />}>
              <Route element={<PatientAuthRoute redirectPath="signin" />}>
                <Route index element={<AppointmentPage />} />
              </Route>
              <Route path="signup" element={<SignUpPage />} />
              <Route path="signin" element={<SignInPage />} />
            </Route>
            {/* <Route
              path="/appointments"
              element={
                <>
                  <Header />
                  <PatientAuthRoute redirectPath="/signin" />
                </>
              }
            >
              <Route index element={<AppointmentPage />} />
            </Route> */}
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
      <ToastContainer autoClose={3000} position="top-center" closeOnClick />
    </>
  );
};

export default RootComponent;
