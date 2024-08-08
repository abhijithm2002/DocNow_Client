import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DoctorSignup from '../../pages/Doctors/DoctorSignup';
import DoctorLogin from '../../pages/Doctors/DoctorLogin';

const DoctorRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Doctor Home</div>} />
      <Route path="/signup" element={<DoctorSignup />} />
      <Route path='/login' element={<DoctorLogin />} />
    </Routes>
  );
}

export default DoctorRoute;

