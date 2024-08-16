import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleSvg from '../../assets/images/icons8-google.svg';

import toast from 'react-hot-toast';
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
          setError(prevError => ({ ...prevError, [field]: error.response.data.message }));
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
