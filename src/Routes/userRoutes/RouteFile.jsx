// // src/services/RouteFile.js
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Signup from '../../pages/Users/Signup';
// import Login from '../../pages/Users/Login';
// import Otp from '../../components/Auth/otp/Otp';
// import PrivateRoute from '../../components/PrivateRoute';
// import Home from '../../pages/Users/Home'
// import UserProfile from '../../components/Profile/User/UserProfile';
// import PublicRoutes from '../../components/publicRoutes';
// import DoctorsList from '../../components/Doctor/DoctorList';
// import DoctorDetails from '../../pages/Doctors/DoctorDetails';
// import Payment from '../../pages/Doctors/Payment';
// import Appointments from '../../components/Profile/Doctor/Appointments';

// const RouteFile = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route element={<PublicRoutes />}>

//       <Route path="/register" element={<Signup />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/otp" element={<Otp />} />

//       </Route>
//       <Route element={ <PrivateRoute />}>

//         <Route path='/user-profile' element= {<UserProfile />}/>
//         <Route path='/doctors/:specialization?' element= {<DoctorsList />}/>
//         <Route path='/doctor-details/:doctorId' element= {<DoctorDetails />}/>
//         <Route path='/payment' element={<Payment />} />
//         <Route path='/appointments' element={<Appointments />} />




//       </Route>
//     </Routes>
//   );
// };

// export default RouteFile;

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Signup from '../../pages/Users/Signup';
import Login from '../../pages/Users/Login';
import Otp from '../../components/Auth/otp/Otp';
import PrivateRoute from '../../components/PrivateRoute';
import Home from '../../pages/Users/Home';
import UserProfile from '../../components/Profile/User/UserProfile';
import PublicRoutes from '../../components/publicRoutes';
import DoctorsList from '../../components/Doctor/DoctorList';
import DoctorDetails from '../../pages/Doctors/DoctorDetails';
import Payment from '../../pages/Doctors/Payment';
import Appointments from '../../components/Profile/Doctor/Appointments';
import { AnimatePresence, motion } from 'framer-motion';
import Chat from '../../components/User/Communication/Chat';
import Header from '../../components/Header/Header';
import FavouriteDoctors from '../../pages/Users/FavouriteDoctors';
import VideoModal from '../../components/User/VideoModal'
import Footer from '../../components/Footer/Footer';
import CallReject from '../../components/User/CallReject';
import BookingDetails from '../../components/Profile/User/BookingDetails';
import NotificationPage from '../../components/Profile/User/NotificationPage';
// Animation variants for the input div
const divVariants = {
  hidden: {
    opacity: 0,
    y: '-20px', // Slide from above
  },
  visible: {
    opacity: 1,
    y: '0', // Move to its normal position
  },
};

const divTransition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.5, // Adjust the speed of the transition
};

const RouteFile = () => {
  const location = useLocation(); // Get current location for route changes

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Home */}
        <Route
          path="/"
          element={
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={divVariants}
              transition={divTransition}
            >
              <Home />
            </motion.div>
          }
        />

        {/* Public Routes */}
        <Route element={<PublicRoutes />}>
          {/* Register */}
          <Route
            path="/register"
            element={
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={divVariants}
                transition={divTransition}
              >
                <Signup />
              </motion.div>
            }
          />

          {/* Login */}
          <Route
            path="/login"
            element={
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={divVariants}
                transition={divTransition}
              >
                <Login />
              </motion.div>
            }
          />

          {/* OTP */}
          <Route
            path="/otp"
            element={
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={divVariants}
                transition={divTransition}
              >
                <Otp />
              </motion.div>
            }
          />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          {/* User Profile */}
          <Route
            path="/user-profile"
            element={
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={divVariants}
                transition={divTransition}
              >
                <UserProfile />
              </motion.div>
            }
          />

          {/* Doctors List */}
          <Route
            path="/doctors/:specialization?"
            element={
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={divVariants}
                transition={divTransition}
              >
                <DoctorsList />
              </motion.div>
            }
          />

          {/* Doctor Details */}
          <Route
            path="/doctor-details/:doctorId"
            element={
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={divVariants}
                transition={divTransition}
              >
                <DoctorDetails />
              </motion.div>
            }
          />

          {/* Payment */}
          <Route
            path="/payment"
            element={
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={divVariants}
                transition={divTransition}
              >
                <Payment />
              </motion.div>
            }
          />

          {/* Appointments */}
          <Route
            path="/appointments"
            element={
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={divVariants}
                transition={divTransition}
              >
                <Appointments />
              </motion.div>
            }
          />
        </Route>

        <Route
          path="/chat"
          element={
            <>
              <Header />
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={divVariants}
                transition={divTransition}
                className="w-full h-screen"
              >
                <Chat />
              </motion.div>
            </>
          }
        />

        <Route
          path="/favourite-doctors"
          element={
            <>
              <Header />
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={divVariants}
                transition={divTransition}
                className="w-full h-screen"
              >
                <FavouriteDoctors />
              </motion.div>
            </>
          }
        />

        <Route
          path="/redirectToCall"
          element={
            <>
              <Header />
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={divVariants}
                transition={divTransition}
                className="w-full h-screen"
              >
                <VideoModal />
              </motion.div>
            </>
          }
        />

        <Route
          path="/callReject"
          element={
            <>
              <Header />
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={divVariants}
                transition={divTransition}
                className="w-full h-screen"
              >
                <CallReject />
              </motion.div>
            </>
          }
        />

      <Route
          path="/booking-details"
          element={
            <>
              <Header />
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={divVariants}
                transition={divTransition}
                className="w-full h-screen"
              >
                <BookingDetails />
              </motion.div>
            </>
          }
        />
        <Route
          path="/notifications"
          element={
            <>
              <Header />
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={divVariants}
                transition={divTransition}
                className="w-full h-screen"
              >
                <NotificationPage />
              </motion.div>
            </>
          }
        />
      </Routes>


    </AnimatePresence>
  );
};

export default RouteFile;

