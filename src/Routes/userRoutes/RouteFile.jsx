// src/services/RouteFile.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from '../../pages/Users/Signup';
import Login from '../../pages/Users/Login';
import Otp from '../../components/Auth/otp/Otp';
import PrivateRoute from '../../components/PrivateRoute';
import Home from '../../pages/Users/Home'
import UserProfile from '../../components/Profile/UserProfile';
import PublicRoutes from '../../components/publicRoutes';

const RouteFile = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PublicRoutes />}>
      
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/otp" element={<Otp />} />

      </Route>
      <Route element={ <PrivateRoute />}>
       
        <Route path='/user-profile' element= {<UserProfile />}/>

      </Route>
    </Routes>
  );
};

export default RouteFile;

