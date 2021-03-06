import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../components/utils/useAuth';

interface RoutesProps {
  redirectPath: string;
  children?: JSX.Element;
}

const PatientAuthRoute = ({ redirectPath, children }: RoutesProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={redirectPath} />;
  }

  return children ? children : <Outlet />;
};

export default PatientAuthRoute;
