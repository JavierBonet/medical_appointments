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
import AppointmentPage from './components/patient/appointment/AppointmentPage';
import SignUpPage from './components/patient_authentication/SignUpPage';
import SignInPage from './components/patient_authentication/SignInPage';
import { default as AdminSignInPage } from './components/admin/admin_authentication/SignInPage';
import { default as AdminSignUpPage } from './components/admin/admin_authentication/SignUpPage';
import PatientAuthRoute from './routes/PatientAuthRoute';
import PatientHomePage from './components/patient/PatientHomePage';
import AdminAuthRoute from './routes/AdminAuthRoute';
import { default as useAdminAuth } from './components/admin/utils/useAuth';
import { default as usePatientAuth } from './components/utils/useAuth';
import AppointmentsPage from './components/patient/appointment/AppointmentsPage';

const RootComponent = () => {
  const [isPatientAuthenticated, setIsPatientAuthenticated] = useState(false);

  const { adminUser, setAdminUser, logout: adminLogout } = useAdminAuth();

  const { user, setUser, logout: patientLogout } = usePatientAuth();

  return (
    <>
      <AppContext.Provider value={{ isPatientAuthenticated, setIsPatientAuthenticated }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App user={user} logout={patientLogout} />} />
            {/* ADMIN ROUTES */}
            <Route path="/admin" element={<AdminPage adminUser={adminUser} logout={adminLogout} />}>
              <Route element={<AdminAuthRoute adminUser={adminUser} redirectPath="signin" />}>
                <Route index element={<AdminHome />} />
                <Route path="hospitals" element={<HospitalsPage logout={adminLogout} />} />
                <Route path="hospital/:hospitalId" element={<HospitalPage logout={adminLogout} />} />
                <Route path="hospital" element={<HospitalPage logout={adminLogout} />} />
                <Route path="doctors" element={<DoctorsPage logout={adminLogout} />} />
                <Route path="doctor/:doctorId" element={<DoctorPage logout={adminLogout} />}>
                  <Route index element={<CalendarsPage />} />
                  <Route path="calendar/:calendarId" element={<CalendarPage />} />
                  <Route path="calendar" element={<CalendarPage />} />
                </Route>
                <Route path="doctor" element={<DoctorPage logout={adminLogout} />} />
              </Route>
              <Route path="signin" element={<AdminSignInPage adminUser={adminUser} setAdminUser={setAdminUser} />} />
              <Route path="signup" element={<AdminSignUpPage />} />
            </Route>

            {/* PATIENTS ROUTES */}
            <Route path="/patient" element={<PatientHomePage user={user} logout={patientLogout} />}>
              <Route element={<PatientAuthRoute user={user} redirectPath="signin" />}>
                <Route index element={<AppointmentsPage logout={patientLogout} />} />
                <Route path="appointment/:appointmentId" element={<AppointmentPage logout={patientLogout} />} />
                <Route path="appointment" element={<AppointmentPage logout={patientLogout} />} />
              </Route>
              <Route path="signin" element={<SignInPage user={user} setUser={setUser} />} />
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
