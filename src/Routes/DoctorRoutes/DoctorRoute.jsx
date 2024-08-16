import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DoctorSignup from '../../pages/Doctors/DoctorSignup';
import DoctorLogin from '../../pages/Doctors/DoctorLogin';
import DoctorProfile from '../../components/Profile/Doctor/DoctorProfile';
import DoctorPrivateRoute from '../../components/DoctorPrivateRoute';
import Home from '../../pages/Users/Home';
// import DoctorPublicRoute from '../../components/User/DoctorPublicRoute';
const DoctorRoute = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      {/* <Route element={<DoctorPublicRoute />}> */}
      <Route path="/" element={<div>Doctor Home</div>} />
      <Route path="/signup" element={<DoctorSignup />} />
      <Route path='/login' element={<DoctorLogin />} />
      {/* </Route> */}
      
      <Route element={<DoctorPrivateRoute />}>
      <Route path='/profile' element={<DoctorProfile />} />
      </Route>

    </Routes>
  );
}

export default DoctorRoute;

