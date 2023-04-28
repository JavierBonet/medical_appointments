import React from 'react';
import { MdLogout } from 'react-icons/md';
import { toast } from 'react-toastify';
import './LogoutButton/styles.scss';

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
      <button className="logout-button" onClick={patientLogout}>
        <MdLogout />
      </button>
    </div>
  );
}

export default LogoutButton;
