import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navigation-header">
      <NavLink to="/admin"> {'Admin >'}</NavLink>
    </nav>
  );
};

export default Header;
