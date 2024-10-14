import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';


const DoctorPublicRoute = () => {
//   const isAuthenticated = useSelector((state) => state.doctor.isDoctorAuthenticated)
//   const isAdminAuthenticated = useSelector((state) => state.admin.isAuthenticated)
const isDoctorAuthenticated = useSelector((state) => state.doctor.isDoctorAuthenticated)

  if (isDoctorAuthenticated) {
    return <Navigate to='/doctor/home' />
  }
//    else if (isAdminAuthenticated) {
//     return <Navigate to='/admin/dashboard' />
//   }

  return <Outlet />
}

export default DoctorPublicRoute