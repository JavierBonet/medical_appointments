import React from 'react';
import { MdLogout } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props {
  logout: () => void;
}

function LogoutButton({ logout }: Props) {
  function patientLogout() {
    if (confirm('Are you sure to log out?')) {
      toast.info('You have logged out');
      logout();
    }
  }

  return (
    <div className="user-links">
      <NavLink onClick={() => patientLogout()} to="../../">
        <MdLogout />
      </NavLink>
    </div>
  );
}

export default LogoutButton;
