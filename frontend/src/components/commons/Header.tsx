import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import { MdVpnKey } from 'react-icons/md';
import useAuth from '../utils/useAuth';
import LogoutButton from './LogoutButton';

const Header = () => {
  const { user, logout } = useAuth();

  useEffect(() => {}, [user]);

  return (
    <nav className="navigation-header">
      <div className="pages-links">
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
        <LogoutButton logout={logout} />
      )}
    </nav>
  );
};

export default Header;
