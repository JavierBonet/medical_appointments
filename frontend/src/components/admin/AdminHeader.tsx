import { NavLink } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';
import LogoutButton from '../commons/LogoutButton';
import { FaUserPlus } from 'react-icons/fa';
import { MdVpnKey } from 'react-icons/md';

interface PropsInterface {
  adminUser: LocalStorageAdminUser | undefined;
  logout: () => void;
}

const AdminHeader = ({ adminUser, logout }: PropsInterface) => {
  return (
    <nav className="navigation-header">
      <div className="pages-links">
        <NavLink to="/" className="navigation-header-item">
          <BsChevronLeft />
          {'Home'}
        </NavLink>
        {!adminUser ? (
          <>
            <div className="user-links">
              <NavLink to="signup">
                <FaUserPlus />
              </NavLink>
              <div className="links-separator"></div>
              <NavLink to="signin">
                <MdVpnKey />
              </NavLink>
            </div>
          </>
        ) : (
          <>
            <div className="links-separator"></div>
            <NavLink to="hospitals" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Hospitals
            </NavLink>
            <div className="links-separator"></div>
            <NavLink to="doctors" className={({ isActive }) => (isActive ? 'active-link' : '')}>
              Doctors
            </NavLink>
            <LogoutButton logout={logout} />
          </>
        )}
      </div>
    </nav>
  );
};

export default AdminHeader;
