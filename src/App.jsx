import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RouteFile from './Routes/userRoutes/RouteFile';
import DoctorRoute from './Routes/DoctorRoutes/DoctorRoute';
import AdminRoutes from './Routes/AdminRoutes/AdminRoutes';
import { Toaster } from 'react-hot-toast';

const App = () => {
  console.log('coming to app');
  return (
    <>
    <Toaster position='top center' reverseOrder={false}/>
    <Router>
      <Routes>
        <Route path="/*" element={<RouteFile />} />
        <Route path="/doctor/*" element={<DoctorRoute />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
    </>

  );
}

export default App;


