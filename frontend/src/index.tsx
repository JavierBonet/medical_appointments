import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import '../public/styles/general.scss';
import HospitalsPage from './components/hospital/HospitalsPage';
import DoctorsPage from './components/doctor/DoctorsPage';

ReactDom.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/hospitals" element={<HospitalsPage />} />
      <Route path="/doctors" element={<DoctorsPage />} />
    </Routes>
  </BrowserRouter>,
  document.querySelector('#root')
);
