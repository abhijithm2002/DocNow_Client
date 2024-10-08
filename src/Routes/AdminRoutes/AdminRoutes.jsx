import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../../pages/Admin/AdminLogin';
import Dashboard from '../../pages/Admin/Dashboard';
import Userslist from '../../pages/Admin/UsersList';
import AdminPrivateRoutes from '../../components/AdminPrivateRoutes';
import DoctorList from '../../pages/Admin/DoctorList';
import DoctorVerification from '../../pages/Admin/DoctorVerification';
import BannerMangement from '../../pages/Admin/BannerMangement';


function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<AdminLogin />}/>

        <Route element={<AdminPrivateRoutes />}>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/users-list' element={<Userslist />}/>
        <Route path='/doctors-list' element={<DoctorList />}/>
        <Route path='/doctors-verification/:id' element={<DoctorVerification />}/>
        <Route path='/banner' element={<BannerMangement />}/>
        
        </Route>
      </Routes>
    </div>
  )
}

export default AdminRoutes
