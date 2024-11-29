import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useEditProfileFormik from '../../Auth/formValidation/editProfileValidaton';
import { editProfile } from '../../../services/User/userService';
import { FaUser } from 'react-icons/fa';
import uploadImageToCloudinary from '../../../utils/uploadCloudinary';
import toast, { Toaster } from 'react-hot-toast';
import HashLoader from 'react-spinners/HashLoader';
import { setCredentials } from '../../../ReduxStore/authSlice';

const EditProfile = () => {
  const { user , accessToken} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [previewURL, setPreviewURL] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    if (data.url) {
      setPreviewURL(data.url);
      formik.setFieldValue('photo', data.url);
    } else {
      toast.error('Failed to upload image');
    }
  };

  const formik = useEditProfileFormik(
    async (values) => {
      setLoading(true);
      try {
        const response = await editProfile(values);
        if (response.status === 200) {
          toast.success('Profile updated successfully!');
          const updatedUser = { ...user, ...values };
          dispatch(setCredentials({ user: updatedUser, accessToken: accessToken }));
          setPreviewURL('');
        } else {
          toast.error('Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile');
      } finally {
        setLoading(false);
      }
    },
    {
      name: user?.name || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
      gender: user?.gender || '',
      photo: user?.photo || '', 
      role: user?.role || 'patient',
    }
  );

  const hasChanges = () => {
    return (
      formik.values.name !== user?.name ||
      formik.values.email !== user?.email ||
      formik.values.mobile !== user?.mobile ||
      formik.values.gender !== user?.gender ||
      formik.values.photo !== user?.photo
    );
  };

  return (
    <section className='px-5 xl:px-0 flex flex-col items-center min-h-screen py-10'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='w-full max-w-[600px]'>
        <div className='flex justify-center'>
          <div className="py-10 px-10 rounded-lg bg-white shadow-lg w-full flex flex-col items-center">
            <form onSubmit={formik.handleSubmit} className='w-full'>
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
                  readOnly
                  aria-readonly
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
              <div className='mb-5 flex items-center gap-3'>
                <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                  {previewURL ? (
                    <img src={previewURL} alt="Profile" className='w-full h-full rounded-full' />
                  ) : (
                    <FaUser className='text-headingColor text-[40px]' />
                  )}
                </figure>
                <div className='relative w-[130px] h-[50px]'>
                  <input
                    type="file"
                    name='photo'
                    id='customFile'
                    onChange={handleFileInputChange}
                    accept='.jpg, .png'
                    className='absolute top-0 left-0 h-full opacity-0 cursor-pointer'
                  />
                  <label htmlFor="customFile" className='absolute top-0 left-0 h-full w-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'>
                    Upload Photo
                  </label>
                </div>
              </div>
              <div className='mt-7 flex justify-center'>
                <button 
                  disabled={!hasChanges() || loading}
                  type='submit' 
                  className='w-full max-w-[200px] bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
                  {loading ? <HashLoader size={35} color='#ffffff' /> : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
