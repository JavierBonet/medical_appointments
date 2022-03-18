import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import '../public/styles/general.scss';
import HospitalsPage from './components/admin/hospital/HospitalsPage';
import DoctorsPage from './components/admin/doctor/DoctorsPage';
import AdminPage from './components/admin/Admin';
import AdminHome from './components/admin/AdminHome';

ReactDom.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/admin" element={<AdminPage />}>
        <Route index element={<AdminHome />} />
        <Route path="hospitals" element={<HospitalsPage />} />
        <Route path="doctors" element={<DoctorsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.querySelector('#root')
);
