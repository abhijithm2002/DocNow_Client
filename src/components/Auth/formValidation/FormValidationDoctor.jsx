import * as Yup from 'yup';
import { useFormik } from 'formik';

const DoctorSignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short! Enter a valid name')
        .max(50, 'Too Long! Enter a valid name')
        .required('Please enter the name')
        .trim('No leading or trailing spaces')
        .test('no-empty-spaces', 'Cannot be empty or contain only spaces', value => value.trim().length > 0),
    email: Yup.string()
        .email('Invalid email')
        .required('Please enter the email')
        .trim('No leading or trailing spaces')
        .test('no-empty-spaces', 'Cannot be empty or contain only spaces', value => value.trim().length > 0),
    password: Yup.string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .required('Please enter the password')
        .matches(/^\S*$/, 'Password cannot contain spaces')
        .trim('No leading or trailing spaces')
        .test('no-empty-spaces', 'Cannot be empty or contain only spaces', value => value.trim().length > 0),
    confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required')
        .trim('No leading or trailing spaces')
        .test('no-empty-spaces', 'Cannot be empty or contain only spaces', value => value.trim().length > 0),
    mobile: Yup.string()
        .required('Please enter the mobile number')
        .matches(/^[1-9][0-9]{9}$/, 'Enter a valid number')
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .trim('No leading or trailing spaces')
        .test('no-empty-spaces', 'Cannot be empty or contain only spaces', value => value.trim().length > 0),
    expertise: Yup.string()
        .required('Please select your specialization')
        .trim('No leading or trailing spaces')
        .test('no-empty-spaces', 'Cannot be empty or contain only spaces', value => value.trim().length > 0),
    currentWorkingHospital: Yup.string()
        .required('Please enter your current working hospital')
        .trim('No leading or trailing spaces')
        .test('no-empty-spaces', 'Cannot be empty or contain only spaces', value => value.trim().length > 0),
    education: Yup.string()
        .required('Please enter your education details')
        .trim('No leading or trailing spaces')
        .test('no-empty-spaces', 'Cannot be empty or contain only spaces', value => value.trim().length > 0),
    languageKnown: Yup.string()
        .required('Please enter languages known')
        .trim('No leading or trailing spaces')
        .test('no-empty-spaces', 'Cannot be empty or contain only spaces', value => value.trim().length > 0),
});

const useDoctorSignupFormik = (onSubmit) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmpassword: '',
            mobile: '',
            expertise: '',
            currentWorkingHospital: '',
            education: '',
            languageKnown: '',
            role: 'doctor',
        },
        validationSchema: DoctorSignupSchema,
        onSubmit,
    });

    return formik;
};

export default useDoctorSignupFormik;
