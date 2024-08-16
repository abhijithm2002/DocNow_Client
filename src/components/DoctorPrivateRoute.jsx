import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { useSelector } from 'react-redux'

const DoctorPrivateRoute = () => {
  const reduxstate=useSelector(state => state)
    const isDoctorAuthenticated = reduxstate.doctor.isDoctorAuthenticated
    const isUserAuthenticated=reduxstate.auth.isAuthenticated
    const isAdminAuthenticated=reduxstate.admin.isAdminAuthenticated
    // console.log(' doctor is isAuthenticated', isDoctorAuthenticated)
    if(!isDoctorAuthenticated && isUserAuthenticated){
      return <Navigate to='/' />
    }
    if(!isDoctorAuthenticated && isAdminAuthenticated){
      return <Navigate to='/admin/dashboard' />
    }

    if(isDoctorAuthenticated) {
    return (
      <>
      <Header />
      <Outlet />
      <Footer />
  </>
    )
  }
  return <Navigate to='/doctor/login' />
}

export default DoctorPrivateRoute