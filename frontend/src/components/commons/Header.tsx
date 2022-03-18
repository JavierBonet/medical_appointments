import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navigation-header">
      <Link to="/admin"> {'Admin >'}</Link>
    </nav>
  );
};

export default Header;
