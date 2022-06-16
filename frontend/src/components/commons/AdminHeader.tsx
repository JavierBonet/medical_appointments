import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';

const activeStyle = { fontWeight: 'bold' };

const AdminHeader = () => {
  return (
    <nav className="navigation-header">
      <div className="pages-links">
        <NavLink to="/" className="navigation-header-item">
          <BsChevronLeft />
          {'Home'}
        </NavLink>
        <div className="links-separator"></div>
        <NavLink
          to="hospitals"
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          Hospitals
        </NavLink>
        <div className="links-separator"></div>
        <NavLink
          to="doctors"
          className={({ isActive }) => (isActive ? 'active-link' : '')}
        >
          Doctors
        </NavLink>
      </div>
    </nav>
  );
};

export default AdminHeader;
