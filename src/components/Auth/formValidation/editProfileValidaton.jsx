import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short! Enter a valid name')
    .max(50, 'Too Long! Enter a valid name')
    .test('no-leading-trailing-spaces', 'No leading or trailing spaces', value => {
      return typeof value === 'string' && value.trim() === value;
    })
    .test('no-empty-spaces', 'Cannot be empty or contain only spaces', value => {
      return typeof value === 'string' && value.trim().length > 0;
    }),
  email: Yup.string()
    .email('Invalid email')
    .test('no-leading-trailing-spaces', 'No leading or trailing spaces', value => {
      return typeof value === 'string' && value.trim() === value;
    })
    .test('no-empty-spaces', 'Cannot be empty or contain only spaces', value => {
      return typeof value === 'string' && value.trim().length > 0;
    }),
  mobile: Yup.string()
    .matches(/^[1-9][0-9]{9}$/, 'Enter a valid number')
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits'),
  role: Yup.string()
    .required('Please select a role')
});

const useEditProfileFormik = (onSubmit, initialValues) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignupSchema,
    onSubmit,
  });

  return formik;
};

export default useEditProfileFormik;
