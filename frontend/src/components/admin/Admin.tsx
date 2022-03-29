import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../commons/AdminHeader';

const AdminPage = () => {
  return (
    <>
      <AdminHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default AdminPage;
