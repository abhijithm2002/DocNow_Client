import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DoctorSignup from '../../pages/Doctors/DoctorSignup';
import DoctorLogin from '../../pages/Doctors/DoctorLogin';
import DoctorProfile from '../../components/Profile/Doctor/DoctorProfile';
import DoctorPrivateRoute from '../../components/DoctorPrivateRoute';
import Home from '../../pages/Users/Home';
import Message from '../../components/Profile/Doctor/Message';
import Chat from '../../components/Doctor/Communication/Chat'
import DoctorPublicRoute from '../../components/DoctorPublicRoute'
import Header from '../../components/Header/Header';
import VideoModal from '../../components/Doctor/VideoModal';
import Appointments from '../../components/Profile/Doctor/Appointments';
import NotificationPage from '../../components/Profile/Doctor/NotificationPage';

const DoctorRoute = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route element={<DoctorPublicRoute />}>
      <Route path="/" element={<div>Doctor Home</div>} />
      <Route path="/signup" element={<DoctorSignup />} />
      <Route path='/login' element={<DoctorLogin />} />
      </Route>
      
      <Route element={<DoctorPrivateRoute />}>
      <Route path='/profile' element={<DoctorProfile />} />
      <Route path='/message' element={<Message />} />
      <Route path='/video-call' element={<VideoModal />} />
      <Route path='/appointments' element={<Appointments />} />
      <Route path='/notifications' element={<NotificationPage />} />
      
      </Route>
      <Route path='/chat' element={ <><Header /> <Chat /></>} />

    </Routes>
  );
}

export default DoctorRoute;

