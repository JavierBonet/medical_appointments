import React, { useState } from 'react';
import { AppContext } from './lib/context';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import HospitalsPage from './components/admin/hospital/HospitalsPage';
import DoctorsPage from './components/admin/doctor/DoctorsPage';
import AdminPage from './components/admin/AdminPage';
import AdminHome from './components/admin/AdminHome';
import HospitalPage from './components/admin/hospital/HospitalPage';
import DoctorPage from './components/admin/doctor/DoctorPage';
import CalendarsPage from './components/admin/doctor/calendar/CalendarsPage';
import CalendarPage from './components/admin/doctor/calendar/CalendarPage';
import AppointmentPage from './components/appointment/AppointmentPage';
import AppointmentsHome from './components/appointment/AppointmentsHome';
import SignUpPage from './components/patient_authentication/SignUpPage';
import SignInPage from './components/patient_authentication/SignInPage';
import { default as AdminSignInPage } from './components/admin/admin_authentication/SignInPage';
import { default as AdminSignUpPage } from './components/admin/admin_authentication/SignUpPage';
import PatientAuthRoute from './routes/PatientAuthRoute';
import PatientHomePage from './components/patient/PatientHomePage';
import AdminAuthRoute from './routes/AdminAuthRoute';
import { default as useAdminAuth } from './components/admin/utils/useAuth';
import { default as usePatientAuth } from './components/utils/useAuth';

const RootComponent = () => {
  const [isPatientAuthenticated, setIsPatientAuthenticated] = useState(false);

  const { adminUser, setAdminUser, logout: adminlogout } = useAdminAuth();

  const { user, setUser, logout: patientLogout } = usePatientAuth();

  return (
    <>
      <AppContext.Provider
        value={{ isPatientAuthenticated, setIsPatientAuthenticated }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route
              path="/admin"
              element={<AdminPage adminUser={adminUser} logout={adminlogout} />}
            >
              <Route element={<AdminAuthRoute redirectPath="signin" />}>
                <Route index element={<AdminHome />} />
                <Route path="hospitals" element={<HospitalsPage />} />
                <Route path="hospital/:hospitalId" element={<HospitalPage />} />
                <Route path="hospital" element={<HospitalPage />} />
                <Route path="doctors" element={<DoctorsPage />} />
                <Route path="doctor/:doctorId" element={<DoctorPage />}>
                  <Route index element={<CalendarsPage />} />
                  <Route path="calendars" element={<CalendarsPage />} />
                  <Route
                    path="calendar/:calendarId"
                    element={<CalendarPage />}
                  />
                  <Route path="calendar" element={<CalendarPage />} />
                </Route>
                <Route path="doctor" element={<DoctorPage />} />
              </Route>
              <Route
                path="signin"
                element={
                  <AdminSignInPage
                    adminUser={adminUser}
                    setAdminUser={setAdminUser}
                  />
                }
              />
              <Route path="signup" element={<AdminSignUpPage />} />
            </Route>

            <Route
              path="/patients"
              element={<PatientHomePage user={user} logout={patientLogout} />}
            >
              <Route element={<PatientAuthRoute redirectPath="signin" />}>
                <Route index element={<AppointmentPage />} />
              </Route>
              <Route
                path="signin"
                element={<SignInPage user={user} setUser={setUser} />}
              />
              <Route path="signup" element={<SignUpPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
      <ToastContainer autoClose={2000} position="top-center" closeOnClick />
    </>
  );
};

export default RootComponent;
