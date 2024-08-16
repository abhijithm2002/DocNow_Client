// // src/validationSchema.js
// import * as Yup from 'yup';

// export const doctorProfileValidationSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     mobile: Yup.string()
//         .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
//         .required('Mobile number is required'),
//     gender: Yup.string().required('Gender is required'),
//     expertise: Yup.string().required('Specialization is required'),
//     bookingfees: Yup.number().required('Booking fees are required'),
//     currentWorkingHospital: Yup.string().required('Current working hospital is required'),
//     experienceYears: Yup.number().required('Experience years are required'),
//     medicalLicenseNo: Yup.string().required('Medical license number is required'),
//     bio: Yup.string().required('Bio is required'),
//     photo: Yup.string().url('Invalid URL'),
// });
