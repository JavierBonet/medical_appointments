import React, { useState } from 'react';

interface User {
  name: string;
}

const LOCAL_STORAGE_PATIENT_KEY = 'patient-user';

function useAuth() {
  const getUser = () => {
    let user: User | undefined = undefined;
    const userString = localStorage.getItem(LOCAL_STORAGE_PATIENT_KEY);
    if (userString) {
      user = JSON.parse(userString);
    }

    return user;
  };

  const [user, setUser] = useState(getUser());

  const saveUser = (user: User) => {
    localStorage.setItem(LOCAL_STORAGE_PATIENT_KEY, JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_PATIENT_KEY);
    setUser(undefined);
  };

  return { user, setUser: saveUser, logout };
}

export default useAuth;
