import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { useSelector } from 'react-redux'



const PrivateRoute = () => {

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  console.log('isAuthenticated', isAuthenticated)
  if(isAuthenticated) {
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