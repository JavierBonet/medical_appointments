import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../components/admin/utils/useAuth';

interface RoutesProps {
  adminUser: LocalStorageAdminUser | undefined;
  redirectPath: string;
  children?: JSX.Element;
}

const AdminAuthRoute = ({ adminUser, redirectPath, children }: RoutesProps) => {
  if (!adminUser) {
    toast.warning('Please log in');
    return <Navigate to={redirectPath} />;
  }

  return children ? children : <Outlet />;
};

export default AdminAuthRoute;
