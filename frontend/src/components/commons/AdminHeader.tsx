import React from 'react';
import { Link } from 'react-router-dom';

const activeStyle = { fontWeight: 'bold' };

const AdminHeader = () => {
  return (
    <nav className="navigation-header">
      <Link
        to="/"
        className={({ isActive: boolean }) => (isActive ? activeStyle : {})}
      >
        Home
      </Link>{' '}
      {' | '}
      <Link to="/admin">Admin</Link> {' | '}
      <Link to="hospitals">Hospitals</Link> {' | '}
      <Link to="doctors">Doctors</Link>
    </nav>
  );
};

export default AdminHeader;
