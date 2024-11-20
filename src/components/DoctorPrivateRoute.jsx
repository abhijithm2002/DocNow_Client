import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { useSelector } from 'react-redux';

const DoctorPrivateRoute = () => {
  const isDoctorAuthenticated = useSelector(state => state.doctor.isDoctorAuthenticated);
  const isUserAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isAdminAuthenticated = useSelector(state => state.admin.isAdminAuthenticated);

  if (!isDoctorAuthenticated && isUserAuthenticated) {
    return <Navigate to="/" />;
  }
  if (!isDoctorAuthenticated && isAdminAuthenticated) {
    return <Navigate to="/admin/dashboard" />;
  }

  if (isDoctorAuthenticated) {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  }
  return <Navigate to="/doctor/login" />;
};

export default DoctorPrivateRoute;
