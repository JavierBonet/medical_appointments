import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';
import useAuth from '../../routes/useAuth';

const Header = () => {
  const { logout } = useAuth();

  return (
    <nav className="navigation-header">
      <div className="pages-links">
        <NavLink to="/" className="navigation-header-item">
          <BsChevronLeft />
          {'Home'}
        </NavLink>
      </div>
      <div className="user-links">
        <NavLink onClick={() => logout()} to="../../">
          <MdLogout />
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
