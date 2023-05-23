import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';

interface PropsInterface {
  adminUser: LocalStorageAdminUser | undefined;
  logout: () => void;
}

const AdminPage = ({ adminUser, logout }: PropsInterface) => {
  return (
    <>
      <AdminHeader adminUser={adminUser} logout={logout} />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default AdminPage;
