import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';
import useAuth from '../utils/useAuth';
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
        {user && <LogoutButton logout={logout} />}
      </div>
    </nav>
  );
};

export default Header;
