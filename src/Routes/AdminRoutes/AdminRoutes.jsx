import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../../pages/Admin/AdminLogin';
import Dashboard from '../../pages/Admin/Dashboard';
import Userslist from '../../pages/Admin/UsersList';
import AdminPrivateRoutes from '../../components/AdminPrivateRoutes';
import DoctorList from '../../pages/Admin/DoctorList';
import DoctorVerification from '../../pages/Admin/DoctorVerification';
import BannerMangement from '../../pages/Admin/BannerMangement';
import AdminPublicRoute from '../../components/AdminPublicRoute';
import BookingList from '../../pages/Admin/BookingList';


function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<AdminPublicRoute/>}>
        <Route path='/login' element={<AdminLogin />}/>

        </Route>

        <Route element={<AdminPrivateRoutes />}>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/users-list' element={<Userslist />}/>
        <Route path='/doctors-list' element={<DoctorList />}/>
        <Route path='/doctors-verification/:id' element={<DoctorVerification />}/>
        <Route path='/banner' element={<BannerMangement />}/>
        <Route path='/bookingList' element={<BookingList />}/>
        
        </Route>
      </Routes>
    </div>
  )
}

export default AdminRoutes
