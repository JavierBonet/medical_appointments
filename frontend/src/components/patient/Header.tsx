import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';
import LogoutButton from '../commons/LogoutButton';

interface PropsInterface {
  user: LocalStorageUser | undefined;
  logout: () => void;
}

const Header = ({ user, logout }: PropsInterface) => {
  return (
    <nav className="navigation-header">
      <div className="pages-links">
        <NavLink to="/" className="navigation-header-item">
          <BsChevronLeft />
          {'Home'}
        </NavLink>
        <div className="links-separator"></div>
        <NavLink
          to="/patient"
          className={({ isActive }) =>
            isActive ? 'active-link' : 'navigation-header-item'
          }
        >
          {'Appointments'}
        </NavLink>
        {user && <LogoutButton logout={logout} />}
      </div>
    </nav>
  );
};

export default Header;
