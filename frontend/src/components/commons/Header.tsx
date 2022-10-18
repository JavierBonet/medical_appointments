import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import { MdVpnKey } from 'react-icons/md';
import LogoutButton from './LogoutButton';

interface PropsInterface {
  user: LocalStorageUser | undefined;
  logout: () => void;
}

const Header = ({ user, logout }: PropsInterface) => {
  return (
    <nav className="navigation-header">
      <div className="pages-links">
        <NavLink to="/patient" className="navigation-header-item">
          {user ? 'Appointments' : 'My info'}
        </NavLink>
      </div>
      {!user ? (
        <div className="user-links">
          <NavLink to="/patient/signup">
            <FaUserPlus />
          </NavLink>
          <div className="links-separator"></div>
          <NavLink to="/patient/signin">
            <MdVpnKey />
          </NavLink>
        </div>
      ) : (
        <LogoutButton logout={logout} />
      )}
    </nav>
  );
};

export default Header;
