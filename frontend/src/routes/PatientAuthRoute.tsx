import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

interface RoutesProps {
  user: LocalStorageUser | undefined;
  redirectPath: string;
  children?: JSX.Element;
}

const PatientAuthRoute = ({ user, redirectPath, children }: RoutesProps) => {
  if (!user) {
    toast.warning('Please log in');
    return <Navigate to={redirectPath} />;
  }

  return children ? children : <Outlet />;
};

export default PatientAuthRoute;
