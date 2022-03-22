import React from 'react';
import ReactDom from 'react-dom';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import '../public/styles/general.scss';
import 'react-toastify/dist/ReactToastify.css';
import HospitalsPage from './components/admin/hospital/HospitalsPage';
import DoctorsPage from './components/admin/doctor/DoctorsPage';
import AdminPage from './components/admin/Admin';
import AdminHome from './components/admin/AdminHome';
import HospitalPage from './components/admin/hospital/HospitalPage';
import DoctorPage from './components/admin/doctor/DoctorPage';

ReactDom.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<AdminHome />} />
          <Route path="hospitals" element={<HospitalsPage />} />
          <Route path="hospital/:id" element={<HospitalPage />} />
          <Route path="hospital" element={<HospitalPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="doctor/:id" element={<DoctorPage />} />
          <Route path="doctor" element={<DoctorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer autoClose={3000} position="top-center" closeOnClick />
  </>,
  document.querySelector('#root')
);
