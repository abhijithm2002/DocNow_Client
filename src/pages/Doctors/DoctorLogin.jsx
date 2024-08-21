import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleSvg from '../../assets/images/icons8-google.svg';

import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoginWithGoogle from '../../utils/LoginWithGoogle';
import BackgroundImage from '../../assets/images/doctorLogin.avif'
import { doctorLogin } from '../../services/Auth/doctorAuth';
import { setCredentials } from '../../ReduxStore/doctorSlice/index'
import { useDispatch } from 'react-redux';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";


function DoctorLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setError({ email: '', password: '' }); // Reset errors before submission
      try {
        const response = await doctorLogin(values);
        console.log('response from doctor login', response)
        if (response.status === 200) {
          toast.success('Login successful!');
          const { data } = response;
          // console.log('response from doctor login', data);

          dispatch(setCredentials({ doctor: data.doctor, accessToken: data.accessToken }));
          navigate('/doctor/profile');
        } else {
          // Display specific field error
          const field = response.data.field;
          setError(prevError => ({ ...prevError, [field]: response.data.message }));
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          const field = error.response.data.field;
          setError((prevError) => ({ ...prevError, [field]: error.response.data.message }));
          console.log('error response block',error.response.status)
          if (error.response.status === 403) {
            toast.error('Doctor is blocked');
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
      const result = await LoginWithGoogle('doctor');
      if (result) {
        toast.success('Google login successful!');
        navigate('/doctor');
      }
    } catch (error) {
      toast.error('Google login failed. Please try again');
    }
  };

  return (

    <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <section className="flex items-center justify-center min-h-screen px-5 lg:px-0 bg-opacity-50 bg-black">
        <div className="w-full max-w-[400px] mx-auto rounded-lg shadow-md bg-white md:p-10">
        <Toaster position="top-center" reverseOrder={false} />
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
            Doctor <span className="text-primaryColor">Login</span> !
          </h3 >


          <form className="py-4 md:py-0" onSubmit={formik.handleSubmit}>
            <div className="mb-5">
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none ${(formik.touched.email && formik.errors.email) || error.email ? 'border-b-red-500' : 'focus:border-b-primaryColor'
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
                className={`w-full py-3 border-b border-solid border-[#0066ff61] focus:outline-none ${(formik.touched.password && formik.errors.password) || error.password ? 'border-b-red-500' : 'focus:border-b-primaryColor'
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
              <button
                type="submit"
                className="w-full bg-primaryColor text-white text-[16px] leading-[24px] rounded-md px-4 py-2"
              >
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
              <Link to="/doctor/signup" className="text-primaryColor font-medium ml-1">
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>

  );
}

export default DoctorLogin





// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import BookingPage from './BookingPage';
// import { fetchDoctorDetails } from '../../services/User/userService';

// const DoctorDetails = () => {
//     const { doctorId } = useParams();
//     const [doctor, setDoctor] = useState(null);

//     useEffect(() => {
//         const getDoctorDetails = async (doctorId) => {
//             try {
//                 const response = await fetchDoctorDetails(doctorId);
//                 if (response.status === 200) {
//                     setDoctor(response.data.data);
//                 } else {
//                     console.error('Failed to fetch doctor details');
//                 }
//             } catch (error) {
//                 console.error('Error fetching doctor details:', error);
//             }
//         };

//         getDoctorDetails(doctorId);
//     }, [doctorId]);

//     if (!doctor) {
//         return <div>Loading...</div>; // Show a loading state while fetching data
//     }

//     return (
//         <section className='py-8'>
//             <div className='max-w-[1170px] px-5 mx-auto'>
//                 <div className="grid gap-[30px] md:gap-[50px] md:grid-cols-3">
//                     {/* Left column containing the photo and BookingPage on large screens */}
//                     <div className='md:col-span-2'>
//                         <div className='flex flex-col items-center md:flex-row md:items-start gap-5 mb-20 md:mb-10'>
//                             <figure className='w-full max-w-[200px] max-h-[200px]'>
//                                 <img src={doctor.photo} alt="Doctor" className='w-full h-full object-cover' />
//                             </figure>

//                             <div className='text-center md:text-left'>
//                                 <span className='inline-block bg-[#CCF0F3] mt-12 text-irishBlueColor py-1 px-4 lg:px-6 text-[12px] lg:text-[16px] font-semibold rounded'>
//                                     {doctor.expertise}
//                                 </span>
//                                 <h3 className='text-headingColor text-[20px] md:text-[22px] mt-3 font-bold'>
//                                     Dr. {doctor.name}
//                                 </h3>
//                             </div>
//                         </div>

//                         {/* BookingPage moved underneath photo section on small and medium screens */}
//                         <div className='block md:hidden mt-[10px] md:mt-[50px] w-[90%] mx-auto'>
//                             <BookingPage />
//                         </div>

//                         <div className='mt-[50px] md:mt-[50px] border-b border-solid border-[#0066ff34]'>
//                             <button className='py-2 px-4 md:px-5 mr-4 md:mr-5 text-[14px] md:text-[16px] font-semibold text-headingColor'>
//                                 About
//                             </button>

//                             <button className='py-2 px-4 md:px-5 mr-4 md:mr-5 text-[14px] md:text-[16px] font-semibold text-headingColor'>
//                                 Feedback
//                             </button>
//                         </div>

//                         <div>
//                             <h3 className='mt-5 text-[18px] md:text-[20px] font-semibold flex items-center gap-2'>
//                                 About
//                                 <span className='text-irishBlueColor font-bold text-[20px] md:text-[24px]'>
//                                     Dr. {doctor.name}
//                                 </span>
//                             </h3>

//                             <p className='text-[14px] md:text-[16px] mt-2'>
//                                {doctor.bio}
//                             </p>
//                         </div>

//                         <div className='mt-10 md:mt-12'>
//                             <h3 className='text-[18px] md:text-[20px] font-semibold'>
//                                 Education
//                             </h3>

//                             <ul className='pt-4'>
//                                 <li className='flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-5 mb-[20px] md:mb-[30px]'>
//                                     <div>
//                                         <p className='text-[14px] md:text-[16px] font-bold'>
//                                             {doctor.education}
//                                         </p>
//                                     </div>

//                                     <p className='text-[14px] md:text-[16px] font-bold'>
//                                         {doctor.currentWorkingHospital}
//                                     </p>
//                                 </li>
//                             </ul>
//                         </div>

//                         <div className='mt-10 md:mt-12'>
//                             <h3 className='text-[18px] md:text-[20px] font-semibold'>
//                                 Experience
//                             </h3>

//                             <ul className='grid sm:grid-cols-2 gap-4 md:gap-[30px] pt-4'>
//                                 <li className='p-4 rounded bg-[#fff9ea]'>
//                                     <p className='text-[14px] md:text-[15px] font-medium'>
//                                     {doctor.experience} years
//                                     </p>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>

//                     {/* Right column containing BookingPage on large screens */}
//                     <div className='hidden md:block'>
//                         <BookingPage />
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default DoctorDetails;