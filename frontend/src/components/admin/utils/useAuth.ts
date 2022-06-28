import React, { useState } from 'react';

const LOCAL_STORAGE_ADMIN_KEY = 'admin-user';

function useAuth() {
  const getAdminUser = () => {
    let adminUser: LocalStorageAdminUser | undefined = undefined;
    const adminUserString = localStorage.getItem(LOCAL_STORAGE_ADMIN_KEY);
    if (adminUserString) {
      adminUser = JSON.parse(adminUserString);
    }

    return adminUser;
  };

  const [adminUser, setAdminUser] = useState(getAdminUser());

  const saveAdminUser = (adminUser: LocalStorageAdminUser) => {
    localStorage.setItem(LOCAL_STORAGE_ADMIN_KEY, JSON.stringify(adminUser));
    setAdminUser(adminUser);
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_ADMIN_KEY);
    setAdminUser(undefined);
  };

  return { adminUser, setAdminUser: saveAdminUser, logout };
}

export default useAuth;
