import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import { BsChevronRight } from 'react-icons/bs';
import { MdVpnKey, MdLogout } from 'react-icons/md';
import useAuth from '../../routes/useAuth';

const Header = () => {
  const { user, setUser, logout } = useAuth();

  useEffect(() => {}, [user]);

  return (
    <nav className="navigation-header">
      <div className="pages-links">
        <NavLink to="/admin" className="navigation-header-item">
          {'Admin '} <BsChevronRight />
        </NavLink>
        <div className="links-separator"></div>
        <NavLink to="/patients" className="navigation-header-item">
          My info
        </NavLink>
      </div>
      {!user ? (
        <div className="user-links">
          <NavLink to="/patients/signup">
            <FaUserPlus />
          </NavLink>
          <div className="links-separator"></div>
          <NavLink to="/patients/signin">
            <MdVpnKey />
          </NavLink>
        </div>
      ) : (
        <div className="user-links">
          <NavLink onClick={() => logout()} to="/">
            <MdLogout />
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Header;
