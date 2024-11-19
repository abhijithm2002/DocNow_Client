// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import GoogleSvg from '../../assets/images/icons8-google.svg';
// import { userLogin } from '../../services/Auth/userAuth';
// import toast, {Toaster} from 'react-hot-toast';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import LoginWithGoogle from '../../utils/LoginWithGoogle';
// import { setCredentials } from '../../ReduxStore/authSlice/index'
// import BackgroundImage from '../../assets/images/login-background.jpg';
// import { IoEye } from "react-icons/io5";
// import { IoEyeOff } from "react-icons/io5";
// import {motion} from 'framer-motion'

// function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [error, setError] = useState({ email: '', password: '', general: '' });
//   const [showPassword, setShowPassword] = useState(false)

//   const validationSchema = Yup.object({
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     password: Yup.string().required('Password is required'),
//   });

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword)
//   }

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       setError({ email: '', password: '', general: '' }); 
//       try {
//         const response = await userLogin(values);
//         if (response.status === 200) {
//           toast.success('Login successful!');
//           const { data } = response;
//           console.log('response from login', data);
          
//           dispatch(setCredentials({ user: data.user, accessToken: data.accessToken }));
//           navigate('/user-profile');
//         } else {
//           // Display specific field error
//           const field = response.data.field;
//           setError((prevError) => ({ ...prevError, [field]: response.data.message }));
//           toast.error(response.data.message);
//         }
//       } catch (error) {
//         if (error.response && error.response.data) {
//           const field = error.response.data.field;
//           setError((prevError) => ({ ...prevError, [field]: error.response.data.message }));
//           if (error.response.status === 403) {
//             toast.error('User is blocked');
//           } else {
//             toast.error('Login failed. Please check your credentials.');
//           }
//         } else {
//           toast.error('Login failed. Please check your credentials.');
//         }
//       }
//     },
//   });

//   const GoogleSignIn = async () => {
//     try {
//       const result = await LoginWithGoogle();
//       if (result) {
//         toast.success('Google login successful!');
//         const { data } = result;
//         dispatch(setCredentials({ user: data.user, accessToken: data.accessToken }));
//         navigate('/');
//       }
//     } catch (error) {
//       toast.error('Google login failed. Please try again');
//     }
//   };

//   return (
//     <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${BackgroundImage})` }}>
//       <section className="flex items-center justify-center min-h-screen px-5 lg:px-0 bg-opacity-50 bg-black">
//         <div className="w-full max-w-[400px] mx-auto rounded-lg shadow-md bg-white md:p-10">
//         <Toaster position="top-center" reverseOrder={false} />
//           <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
//             Hello! <span className="text-primaryColor">Welcome</span> Back
//           </h3>

//           <form className="py-4 md:py-0" onSubmit={formik.handleSubmit}>
//             <div className="mb-5">
//               <input
//                 type="email"
//                 placeholder="Enter Your Email"
//                 name="email"
//                 value={formik.values.email}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className={`w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none ${
//                   (formik.touched.email && formik.errors.email) || error.email ? 'border-b-red-500' : 'focus:border-b-primaryColor'
//                 } text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer`}
//                 required
//               />
//               {(formik.touched.email && formik.errors.email) || error.email ? (
//                 <div className="text-red-500 text-sm">{formik.errors.email || error.email}</div>
//               ) : null}
//             </div>

//             <div className="mb-5 relative">  
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Enter Your Password"
//                 name="password"
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 className={`w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none ${
//                   (formik.touched.password && formik.errors.password) || error.password ? 'border-b-red-500' : 'focus:border-b-primaryColor'
//                 } text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer`}
//                 required
//               />
//               <div onClick={toggleShowPassword} className='absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer'>
//                 {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
//               </div>
//               {(formik.touched.password && formik.errors.password) || error.password ? (
//                 <div className="text-red-500 text-sm">{formik.errors.password || error.password}</div>
//               ) : null}
//             </div>
//             <div className="mt-5">
//               <button
//                 type="submit"
//                 className="w-full bg-primaryColor text-white text-[16px] leading-[24px] rounded-md px-4 py-2"
//               >
//                 Login
//               </button>
//             </div>
//             <div className="flex items-center justify-center mt-2">
//               <hr className="w-1/4 border-gray-300" />
//               <span className="mx-2 text-gray-600 text-sm">or continue with</span>
//               <hr className="w-1/4 border-gray-300" />
//             </div>

//             <div className="mt-2">
//               <button
//                 type="button"
//                 onClick={GoogleSignIn}
//                 className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-red-500 hover:text-white"
//               >
//                 <img src={GoogleSvg} alt="Google" className="w-5 h-5 mr-2" />
//                 Log In with Google
//               </button>
//             </div>

//             <p className="mt-5 text-textColor text-center">
//               Don't have an account?
//               <Link to="/register" className="text-primaryColor font-medium ml-1">
//                 Register
//               </Link>
//             </p>
//             <p className="mt-5 text-textColor text-center">
              
//               <Link to="/doctor/login" className="text-primaryColor font-medium ml-1">
//                 Doctor Login
//               </Link>
//             </p>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Login;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import GoogleSvg from '../../assets/images/icons8-google.svg';
import { userLogin } from '../../services/Auth/userAuth';
import toast, {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoginWithGoogle from '../../utils/LoginWithGoogle';
import { setCredentials } from '../../ReduxStore/authSlice/index'
import BackgroundImage from '../../assets/images/login-background.jpg';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { motion } from 'framer-motion';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState({ email: '', password: '', general: '' });
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setError({ email: '', password: '', general: '' });
      try {
        const response = await userLogin(values);
        if (response.status === 200) {
          toast.success('Login successful!');
          const { data } = response;
          dispatch(setCredentials({ user: data.user, accessToken: data.accessToken }));
          navigate('/user-profile');
        } else {
          const field = response.data.field;
          setError((prevError) => ({ ...prevError, [field]: response.data.message }));
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const field = error.response.data.field;
          setError((prevError) => ({ ...prevError, [field]: error.response.data.message }));
          if (error.response.status === 403) {
            toast.error('User is blocked');
          } else {
            toast.error('Login failed. Please check your credentials.');
          }
        } else {
          toast.error('Login failed. Please check your credentials.');
        }
      }
    },
  });

  const GoogleSignIn = async () => {
    try {
      const result = await LoginWithGoogle();
      if (result) {
        toast.success('Google login successful!');
        const { data } = result;
        dispatch(setCredentials({ user: data.user, accessToken: data.accessToken }));
        navigate('/');
      }
    } catch (error) {
      toast.error('Google login failed. Please try again');
    }
  };

  const navigateWithAnimation = (path) => {
    setTimeout(() => {
      navigate(path);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      
      <section className="flex items-center justify-center min-h-screen px-5 lg:px-0  bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
        <div className="w-full max-w-[400px] mx-auto rounded-lg shadow-md bg-white  sm:p-10 md:p-10">
          <Toaster position="top-center" reverseOrder={false} />
          <h3 className="text-headingColor px-5 py-3  text-[22px] leading-9 font-bold mb-10">
            Hello! <span className="text-primaryColor">Welcome</span> Back
          </h3>

          <form className="py-4 px-4 md:py-0" onSubmit={formik.handleSubmit}>
            <div className="mb-5">
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none ${
                  (formik.touched.email && formik.errors.email) || error.email ? 'border-b-red-500' : 'focus:border-b-primaryColor'
                } text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer`}
                required
              />
              {(formik.touched.email && formik.errors.email) || error.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email || error.email}</div>
              ) : null}
            </div>

            <div className="mb-5 relative">  
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Your Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none ${
                  (formik.touched.password && formik.errors.password) || error.password ? 'border-b-red-500' : 'focus:border-b-primaryColor'
                } text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer`}
                required
              />
              <div onClick={toggleShowPassword} className='absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer'>
                {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
              </div>
              {(formik.touched.password && formik.errors.password) || error.password ? (
                <div className="text-red-500 text-sm">{formik.errors.password || error.password}</div>
              ) : null}
            </div>

            <div className="mt-5">
              <button type="submit" className="w-full bg-primaryColor text-white text-[16px] leading-[24px] rounded-md px-4 py-2">
                Login
              </button>
            </div>

            <div className="flex items-center justify-center mt-2">
              <hr className="w-1/4 border-gray-300" />
              <span className="mx-2 text-gray-600 text-sm">or continue with</span>
              <hr className="w-1/4 border-gray-300" />
            </div>

            <div className="mt-2">
              <button
                type="button"
                onClick={GoogleSignIn}
                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-red-500 hover:text-white"
              >
                <img src={GoogleSvg} alt="Google" className="w-5 h-5 mr-2" />
                Log In with Google
              </button>
            </div>

            <p className="mt-5 text-textColor text-center">
              Don't have an account?
              <Link to="/register" className="text-primaryColor font-medium ml-1" onClick={() => navigateWithAnimation('/register')}>
                Register
              </Link>
            </p>
            <p className="mt-5 text-textColor text-center">
              <Link to="/doctor/login" className="text-primaryColor font-medium ml-1" onClick={() => navigateWithAnimation('/doctor/login')}>
              click here to login as Doctor
              </Link>
            </p>
          </form>
        </div>
      </section>
    </motion.div>
  );
}

export default Login;
