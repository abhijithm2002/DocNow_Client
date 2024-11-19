import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
const AdminPublicRoute = () => {
    const isAdminAuthenticated = useSelector((state) => state.admin.isAdminAuthenticated);
    
    if (isAdminAuthenticated) {
      return <Navigate to='/admin/dashboard' />;
    }
  
    return <Outlet />;
  };
  

export default AdminPublicRoute