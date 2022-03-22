import React from 'react';
import { NavLink } from 'react-router-dom';

const activeStyle = { fontWeight: 'bold' };

const AdminHeader = () => {
  return (
    <nav className="navigation-header">
      <NavLink to="/">{'< Home'}</NavLink>
      {' | '}
      <NavLink
        to="hospitals"
        className={({ isActive }) => (isActive ? 'active-link' : '')}
      >
        Hospitals
      </NavLink>{' '}
      {' | '}
      <NavLink
        to="doctors"
        className={({ isActive }) => (isActive ? 'active-link' : '')}
      >
        Doctors
      </NavLink>
    </nav>
  );
};

export default AdminHeader;
