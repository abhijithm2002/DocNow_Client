import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AdminLeftSidebar from './Admin/AdminLeftSidebar';
import { useSelector } from 'react-redux';

const AdminPrivateRoutes = () => {
  const isAdminAuthenticated = useSelector(state => state.admin.isAdminAuthenticated);
  const isDoctorAuthenticated = useSelector(state => state.doctor.isDoctorAuthenticated);
  const isUserAuthenticated = useSelector(state => state.auth.isAuthenticated);

  if (!isAdminAuthenticated) {
    if (isDoctorAuthenticated) {
      return <Navigate to="/doctor/home" />;
    }
    if (isUserAuthenticated) {
      return <Navigate to="/" />;
    }
    return <Navigate to="/admin/login" />;
  }

  return (
    <>
      <AdminLeftSidebar />
      <div className="custom-size:px-28 md:pt-6 pt-10 pb-5 bg-indigo-400 h-fit min-h-screen md:ml-64 md:pr-8">
        <div className="md:ml-36">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminPrivateRoutes;
