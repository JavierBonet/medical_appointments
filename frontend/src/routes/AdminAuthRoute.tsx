import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../components/admin/utils/useAuth';

interface RoutesProps {
  redirectPath: string;
  children?: JSX.Element;
}

const AdminAuthRoute = ({ redirectPath, children }: RoutesProps) => {
  const { adminUser } = useAuth();

  if (!adminUser) {
    return <Navigate to={redirectPath} />;
  }

  return children ? children : <Outlet />;
};

export default AdminAuthRoute;
