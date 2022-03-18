import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../commons/AdminHeader';

const AdminPage = () => {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
};
export default AdminPage;
