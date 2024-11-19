import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleSvg from '../../assets/images/icons8-google.svg';
import { adminLogin } from '../../services/Auth/adminAuth';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoginWithGoogle from '../../utils/LoginWithGoogle';
import { useDispatch } from 'react-redux';
import { setAdminCredentials } from '../../ReduxStore/adminSlice';



function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      setError({ email: '', password: '' }); 
      try {
        const response = await adminLogin(values);
        
        if (response.status === 200) {
          const { data } = response;
          
          
          
          dispatch(setAdminCredentials({ user: data, accessToken: data.tokens.accessToken }));
          toast.success('Login successful!');
          navigate('/admin/dashboard');
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
        toast.success('Google login successfull!');
        navigate('/admin/dashboard')
      }
    } catch (error) {
      toast.error('Google login failed. Please try again')
    }
  }

  return (
   

      <section className="flex items-center justify-center min-h-screen px-5 lg:px-0 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] ">
        <div className="w-full max-w-[400px] mx-auto rounded-lg shadow-md bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] md:p-10">
          <h3 className="text-white text-[22px] leading-9 font-bold mb-10">
            Admin <span className="text-primaryColor">Login</span> !
          </h3>

          <form className="py-4 md:py-0" onSubmit={formik.handleSubmit}>
            <div className="mb-5">
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full text-center py-3 border-b border-solid border-[#0066ff61] focus:outline-none ${(formik.touched.email && formik.errors.email) || error.email ? 'border-b-red-500' : 'focus:border-b-primaryColor'
                  } text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer`}
                required
              />
              {(formik.touched.email && formik.errors.email) || error.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email || error.email}</div>
              ) : null}
            </div>

            <div className="mb-5 relative">
              <input
                type="password"
                placeholder="Enter Your Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full text-center py-3 border-b border-solid border-[#0066ff61] focus:outline-none ${(formik.touched.password && formik.errors.password) || error.password ? 'border-b-red-500' : 'focus:border-b-primaryColor'
                  } text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer`}
                required
              />
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
              <Link to="/register" className="text-primaryColor font-medium ml-1">
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
 
    
  );
}

export default AdminLogin;
