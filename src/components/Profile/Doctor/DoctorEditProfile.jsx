import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import uploadImageToCloudinary from '../../../utils/uploadCloudinary';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../../ReduxStore/doctorSlice';
import { editDoctorProfile } from '../../../services/Doctor/doctorService';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const DoctorEditProfile = () => {
    const dispatch = useDispatch();
    const { doctor } = useSelector((state) => state.doctor);
    const [previewURL, setPreviewURL] = useState('');

    useEffect(() => {
        formik.setValues({
            name: doctor.name || "",
            email: doctor.email || "",
            mobile: doctor.mobile || '',
            bio: doctor.bio || "",
            gender: doctor.gender || '',
            expertise: doctor.expertise || '',
            bookingfees: doctor.bookingfees || '',
            currentWorkingHospital: doctor.currentWorkingHospital || '',
            experienceYears: doctor.experienceYears || '',
            medicalLicenseNo: doctor.medicalLicenseNo || '',
            photo: doctor.photo || '',
            documents: doctor.documents || [],
        });
        setPreviewURL('');
    }, [doctor]);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: '',
            bio: "",
            gender: '',
            expertise: '',
            bookingfees: '',
            currentWorkingHospital: '',
            experienceYears: '',
            medicalLicenseNo: '',
            photo: '',
            documents: [],
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            mobile: Yup.string()
                .matches(/^[6-9]\d{9}$/, 'Enter a valid mobile number')
                .required('Mobile number is required'),
            bio: Yup.string().required('Bio is required'),
            gender: Yup.string().required('Gender is required'),
            expertise: Yup.string().required('Specialization is required'),
            bookingfees: Yup.number().required('Booking fee is required').positive('Fee must be positive'),
            currentWorkingHospital: Yup.string().required('Working hospital is required'),
            experienceYears: Yup.number().required('Experience is required').positive('Experience must be positive'),
            medicalLicenseNo: Yup.string().required('Medical License Number is required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await editDoctorProfile(values);
                if (response.status === 200) {
                    toast.success('Profile updated successfully');
                    const updatedDoctor = { ...doctor, ...values };
                    dispatch(setCredentials({ doctor: updatedDoctor, accessToken: doctor.accessToken }));
                    localStorage.setItem('doctorData', JSON.stringify(updatedDoctor));
                    setPreviewURL('');
                } else {
                    toast.error('Failed to update profile');
                }
            } catch (error) {
                console.error('Error updating profile:', error);
                toast.error('Failed to update profile');
            }
        },
    });

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

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <Toaster position="top-right" reverseOrder={false} />
            <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">Profile Information</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-6">
                    <label className="form__label block text-lg font-semibold text-gray-700 mb-2">Name*</label>
                    <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Full Name"
                        className="form__input block w-full text-lg py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-black transition duration-150"
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500 text-sm">{formik.errors.name}</div>
                    ) : null}
                </div>
                <div className="mb-6">
                    <label className="form__label block text-lg font-semibold text-gray-700 mb-2">Email*</label>
                    <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Email"
                        readOnly
                        className="form__input block w-full text-lg py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-black transition duration-150"
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-red-500 text-sm">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="mb-6">
                    <label className="form__label block text-lg font-semibold text-gray-700 mb-2">Phone*</label>
                    <input
                        type="text"
                        name="mobile"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter the Mobile"
                        className="form__input block w-full text-lg py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-black transition duration-150"
                    />
                    {formik.touched.mobile && formik.errors.mobile ? (
                        <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
                    ) : null}
                </div>

                <div className="mb-5">
                    <div className='grid grid-cols-3 gap-5 mb-[30px]'>
                        <div>
                            <p className="form__label block text-lg font-semibold text-gray-700 mb-2">Gender*</p>
                            <select
                                name="gender"
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="form__input block w-full text-lg py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-black transition duration-150">
                                <option value="">Select</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>
                            {formik.touched.gender && formik.errors.gender ? (
                                <div className="text-red-500 text-sm">{formik.errors.gender}</div>
                            ) : null}
                        </div>
                        <div>
                            <p className="form__label block text-lg font-semibold text-gray-700 mb-2">Specialization*</p>
                            <input
                                type="text"
                                name="expertise"
                                value={formik.values.expertise}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                readOnly
                                className="form__input block w-full text-lg py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-black transition duration-150"
                            />
                            {formik.touched.expertise && formik.errors.expertise ? (
                                <div className="text-red-500 text-sm">{formik.errors.expertise}</div>
                            ) : null}
                        </div>
                        <div>
                            <p className="form__label block text-lg font-semibold text-gray-700 mb-2">Fee*</p>
                            <input
                                type="number"
                                name="bookingfees"
                                value={formik.values.bookingfees}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter the Fees"
                                className="form__input block w-full text-lg py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-black transition duration-150"
                            />
                            {formik.touched.bookingfees && formik.errors.bookingfees ? (
                                <div className="text-red-500 text-sm">{formik.errors.bookingfees}</div>
                            ) : null}
                        </div>
                        <div>
                            <p className="form__label block text-lg font-semibold text-gray-700 mb-2">Working Hospital*</p>
                            <input
                                type="text"
                                name="currentWorkingHospital"
                                value={formik.values.currentWorkingHospital}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter the Hospital Name"
                                className="form__input block w-full text-lg py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-black transition duration-150"
                            />
                            {formik.touched.currentWorkingHospital && formik.errors.currentWorkingHospital ? (
                                <div className="text-red-500 text-sm">{formik.errors.currentWorkingHospital}</div>
                            ) : null}
                        </div>
                        <div>
                            <p className="form__label block text-lg font-semibold text-gray-700 mb-2">Experience*</p>
                            <input
                                type="number"
                                name="experienceYears"
                                value={formik.values.experienceYears}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter the Experience in Years"
                                className="form__input block w-full text-lg py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-black transition duration-150"
                            />
                            {formik.touched.experienceYears && formik.errors.experienceYears ? (
                                <div className="text-red-500 text-sm">{formik.errors.experienceYears}</div>
                            ) : null}
                        </div>
                        <div>
                            <p className="form__label block text-lg font-semibold text-gray-700 mb-2">Medical License Number*</p>
                            <input
                                type="text"
                                name="medicalLicenseNo"
                                value={formik.values.medicalLicenseNo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter the Medical License Number"
                                className="form__input block w-full text-lg py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-black transition duration-150"
                            />
                            {formik.touched.medicalLicenseNo && formik.errors.medicalLicenseNo ? (
                                <div className="text-red-500 text-sm">{formik.errors.medicalLicenseNo}</div>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="form__label block text-lg font-semibold text-gray-700 mb-2">Bio*</label>
                    <textarea
                        name="bio"
                        value={formik.values.bio}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Enter your bio"
                        className="form__input block w-full text-lg py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-black transition duration-150"
                    />
                    {formik.touched.bio && formik.errors.bio ? (
                        <div className="text-red-500 text-sm">{formik.errors.bio}</div>
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
                                Upload Profile
                            </label>
                        </div>
                    </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg py-3 px-6 rounded-lg shadow-md focus:outline-none transition duration-150"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DoctorEditProfile;




    // const handleMultipleFileUpload = async (event) => {
    //     setIsLoading(true);  // Start loading
    //     const files = event.target.files;
    //     const uploadedFiles = [];

    //     for (let i = 0; i < files.length; i++) {
    //         const data = await uploadImageToCloudinary(files[i]);
    //         if (data.url) {
    //             uploadedFiles.push(data.url);
    //         } else {
    //             toast.error(`Failed to upload document ${i + 1}`);
    //         }
    //     }

    //     setUploadedDocuments([...uploadedDocuments, ...uploadedFiles]);
    //     setFormData({ ...formData, documents: [...formData.documents, ...uploadedFiles] });
    //     setIsLoading(false);  // Stop loading
    // };


    // const handleDeleteDocument = (index) => {
    //     const updatedDocuments = uploadedDocuments.filter((_, i) => i !== index);
    //     setUploadedDocuments(updatedDocuments);
    //     setFormData({ ...formData, documents: updatedDocuments });
    // };

/////////////////////////// return 

      {/* 
                    <div className='mb-5 flex items-center gap-3'>
                        <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                            <IoIosImages className='color-primaryColor text-[40px]' />
                        </figure>
                        <div className='relative w-[130px] h-[50px]'>
                            <input
                                type="file"
                                multiple
                                id='customFileDocuments'
                                name='documents'
                                onChange={handleMultipleFileUpload}
                                accept='.jpg, .png, .pdf'
                                className='absolute top-0 left-0 h-full opacity-0 cursor-pointer'
                            />
                            <label htmlFor="customFileDocuments" className='absolute top-0 left-0 h-full w-full flex items-center px-[0.75rem] py-[0.375rem] text-[13px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'>
                                Upload Documents
                            </label>
                        </div>
                    </div> */}

                    {/* Render Uploaded Documents */}
                    {/* {isLoading ? (
                        <div className="flex justify-center items-center my-5">
                            <HashLoader color={"#0066ff"} loading={isLoading} size={50} />
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-3 mb-5">
                            {uploadedDocuments.map((doc, index) => (
                                <div key={index} className="relative w-[100px] h-[100px] bg-gray-100 p-2 rounded-lg shadow-md">
                                    <img src={doc} alt={`Document ${index + 1}`} className="w-full h-full object-cover rounded" />
                                    <button
                                        type="button"
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                        onClick={() => handleDeleteDocument(index)}
                                    >
                                        <AiOutlineClose size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )} */}