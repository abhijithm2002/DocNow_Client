import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { useSelector } from 'react-redux'



const PrivateRoute = () => {

  const reduxstate=useSelector(state => state)
  const isDoctorAuthenticated = reduxstate.doctor.isDoctorAuthenticated
  const isUserAuthenticated=reduxstate.auth.isAuthenticated
  const isAdminAuthenticated=reduxstate.admin.isAdminAuthenticated
  if(isDoctorAuthenticated && !isUserAuthenticated){
    return <Navigate to='/doctor/home' />
  }
  if(!isUserAuthenticated && isAdminAuthenticated){
    return <Navigate to='/admin/dashboard' />
  }
  if(isUserAuthenticated) {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    
</>
  )
}
return <Navigate to='/login' />
}

export default PrivateRoute