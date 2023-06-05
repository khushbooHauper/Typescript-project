import * as Yup from 'yup';
import moment from 'moment';



export const PersonnalDetailsValidationSchema = Yup.object({
    firstName: Yup.string()
      .required('First Name is required').min(2, 'First Name should be at least 2 characters')
      .max(50, 'First Name should not exceed 50 characters')
      .matches(/^[^\d]+$/, 'First Name should not contain numbers'),
    lastName: Yup.string()
      .required('Last Name is required').min(2, 'First Name should be at least 2 characters')
      .max(50, 'First Name should not exceed 50 characters')
      .matches(/^[^\d]+$/, 'Last Name should not contain numbers'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Invalid email format'
      ),
    phone: Yup.string()
      .required('Phone is required')
      .matches(
        /^[0-9]{10}$/,
        'Phone number should be a 10-digit number'
      ),
    address: Yup.string().required('Address is required'),
    city: Yup.string()
    .required('City is required')
    .min(2, 'City should be at least 2 characters')
    .max(50, 'City should not exceed 50 characters')
    .matches(/^[^\d]+$/, 'City should not contain numbers'),
  
    state: Yup.string()
      .required('state is required').min(2, 'state should be at least 2 characters')
      .max(50, 'state should not exceed 50 characters')
      .matches(/^[^\d]+$/, 'state should not contain numbers'),
    pincode: Yup.string()
      .matches(/^\d{6}$/, 'pincode must be a 6-digit number')
      .required('pincode is required'),
    country: Yup.string()
      .required('country is required')
      .matches(/^[^\d]+$/, 'country name should not contain numbers'),
    dob: Yup.date()
      .required('Date of Birth is required')
      .min(moment().subtract(60, 'years'), 'Date of Birth should be at most 60 years ago')
      .max(moment().subtract(18, 'years'), 'Date of Birth should be at least 18 years ago'),
    gender: Yup.string().required('Gender is required'),
  });