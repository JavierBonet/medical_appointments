import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <Link to="/hospitals">Hospitals</Link> {' | '}
      <Link to="/doctors">Doctors</Link>
    </nav>
  );
};

export default Header;
