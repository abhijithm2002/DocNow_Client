import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupImg from '../../assets/images/signup.gif';
import { otpGenerator } from '../../services/Auth/doctorAuth';
import toast from 'react-hot-toast';
import LoginWithGoogle from '../../utils/LoginWithGoogle';
import GoogleSvg from '../../assets/images/icons8-google.svg';
import useDoctorSignupFormik from '../../components/Auth/formValidation/FormValidationDoctor';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../ReduxStore/doctorSlice';

function DoctorSignup() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const formik = useDoctorSignupFormik(async (values) => {
        try {
            const response = await otpGenerator(values.email);
            if (response && response.status === 200) {
                localStorage.setItem('signupData', JSON.stringify(values));
                toast.success("Enter OTP sent to your email");
                navigate("/otp", { state: { email: values.email, action: 'signup', userType: values.role } });
            } else if (response && response.data.message === "Email exists!") {
                toast.error("Email already exists!");
            } else {
                console.error("Unexpected response:", response);
            }
        } catch (error) {
            console.error("Error registering user:", error);
        }
    });

    const GoogleSignIn = async () => {
        try {
            const result = await LoginWithGoogle('doctor');
            if (result) {
                toast.success('Google login successful!');
                const { data } = result;

                // 

                dispatch(setCredentials({ doctor: data.doctor, accessToken: data.accessToken }));
                navigate('/doctor/profile');
            }
        } catch (error) {
            toast.error('Google login failed. Please try again');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    return (
        <section className='px-5 xl:px-0'>
            <div className='max-w-[1170px] mx-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-2'>
                    <div className='hidden lg:block bg-primaryColor rounded-l-lg'>
                        <figure className='rounded-l-lg'>
                            <img src={signupImg} alt="Signup" className='w-full h-full object-cover rounded-l-lg' />
                        </figure>
                    </div>
                    <div className="lg:pl-16 py-10 rounded-r-lg bg-white shadow-lg px-5">
                        <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>
                            Create an <span className='text-primaryColor'>account</span>
                        </h3>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='mb-5'>
                                <input
                                    type="text"
                                    placeholder='Full Name'
                                    name='name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="text-red-500 text-sm">{formik.errors.name}</div>
                                ) : null}
                            </div>
                            <div className='mb-5'>
                                <input
                                    type="email"
                                    placeholder='Email'
                                    name='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-red-500 text-sm">{formik.errors.email}</div>
                                ) : null}
                            </div>
                            <div className='mb-5'>
                                <input
                                    type="number"
                                    placeholder='Mobile Number'
                                    name='mobile'
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                />
                                {formik.touched.mobile && formik.errors.mobile ? (
                                    <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
                                ) : null}
                            </div>

                            <div className='mb-5'>
                                <select
                                    name='expertise'
                                    value={formik.values.expertise}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                >
                                    <option value="" label="Select specialization" />
                                    <option value="Allergy and Immunology" label="Allergy and Immunology" />
                                    <option value="Anesthesiology" label="Anesthesiology" />
                                    <option value="Cardiology" label="Cardiology" />
                                    <option value="Critical Care Medicine" label="Critical Care Medicine" />
                                    <option value="Dentistry" label="Dentistry" />
                                    <option value="Dermatology" label="Dermatology" />
                                    <option value="Endocrinology" label="Endocrinology" />
                                    <option value="Family Medicine" label="Family Medicine" />
                                    <option value="Gastroenterology" label="Gastroenterology" />
                                    <option value="Geriatrics" label="Geriatrics" />
                                    <option value="Hematology" label="Hematology" />
                                    <option value="Infectious Disease" label="Infectious Disease" />
                                    <option value="Internal Medicine" label="Internal Medicine" />
                                    <option value="Nephrology" label="Nephrology" />
                                    <option value="Neurology" label="Neurology" />
                                    <option value="Obstetrics and Gynecology" label="Obstetrics and Gynecology" />
                                    <option value="Oncology" label="Oncology" />
                                    <option value="Ophthalmology" label="Ophthalmology" />
                                    <option value="Orthopedics" label="Orthopedics" />
                                    <option value="Otolaryngology" label="Otolaryngology" />
                                    <option value="Pediatrics" label="Pediatrics" />
                                    <option value="Physical Medicine and Rehabilitation" label="Physical Medicine and Rehabilitation" />
                                    <option value="Plastic Surgery" label="Plastic Surgery" />
                                    <option value="Psychiatry" label="Psychiatry" />
                                    <option value="Pulmonology" label="Pulmonology" />
                                    <option value="Radiology" label="Radiology" />
                                    <option value="Rheumatology" label="Rheumatology" />
                                    <option value="Surgery" label="Surgery" />
                                    <option value="Urology" label="Urology" />
                                    <option value="Vascular Surgery" label="Vascular Surgery" />

                                </select>
                                {formik.touched.expertise && formik.errors.expertise ? (
                                    <div className="text-red-500 text-sm">{formik.errors.expertise}</div>
                                ) : null}
                            </div>

                            <div className='mb-5'>
                                <input
                                    type="text"
                                    placeholder='Current Working Hospital'
                                    name='currentWorkingHospital'
                                    value={formik.values.currentWorkingHospital}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                />
                                {formik.touched.currentWorkingHospital && formik.errors.currentWorkingHospital ? (
                                    <div className="text-red-500 text-sm">{formik.errors.currentWorkingHospital}</div>
                                ) : null}
                            </div>
                            <div className='mb-5'>
                                <input
                                    type="text"
                                    placeholder='Education Details'
                                    name='education'
                                    value={formik.values.education}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                />
                                {formik.touched.education && formik.errors.education ? (
                                    <div className="text-red-500 text-sm">{formik.errors.education}</div>
                                ) : null}
                            </div>
                            <div className='mb-5'>
                                <input
                                    type="text"
                                    placeholder='Languages Known'
                                    name='languageKnown'
                                    value={formik.values.languageKnown}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                />
                                {formik.touched.languageKnown && formik.errors.languageKnown ? (
                                    <div className="text-red-500 text-sm">{formik.errors.languageKnown}</div>
                                ) : null}
                            </div>

                            <div className='mb-5 relative'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Password'
                                    name='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                />
                                <div onClick={toggleShowPassword} className='absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer'>
                                    {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                                </div>
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-red-500 text-sm">{formik.errors.password}</div>
                                ) : null}
                            </div>
                            <div className='mb-5 relative'>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder='Confirm Password'
                                    name='confirmpassword'
                                    value={formik.values.confirmpassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className='w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer'
                                />
                                <div onClick={toggleShowConfirmPassword} className='absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer'>
                                    {showConfirmPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                                </div>
                                {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
                                    <div className="text-red-500 text-sm">{formik.errors.confirmpassword}</div>
                                ) : null}
                            </div>
                            <button type="submit" className='bg-primaryColor py-3 w-full rounded-lg text-white text-[18px] leading-8 font-semibold'>
                                Sign Up
                            </button>

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
                                    Signup with Google
                                </button>
                            </div>
                            <div className='text-center mt-6'>
                                <p className='mt-5 text-textColor text-center'>
                                    Already have an account?
                                    <Link to={'/doctor/login'} className='text-primaryColor font-medium ml-1'>Login</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DoctorSignup;
