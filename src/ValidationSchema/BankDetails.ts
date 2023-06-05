import * as Yup from 'yup';



export const BankDetailsValidationSchema = Yup.object({
    bank: Yup.string()
      .required('Bank Name is required')
      .matches(/^[A-Za-z\s]+$/, 'Bank Name should only contain letters and spaces')
      .min(3, 'Bank Name should be at least 3 characters')
      .max(50, 'Bank Name should not exceed 50 characters'),
    accountNumber: Yup.string()
      .required('Account Number is required')
      .matches(/^\d{6,12}$/, 'Account Number should be a numeric value between 6 and 12 digits'),
    ifsc: Yup.string()
      .required('ifsc code is required')
      .matches(/^[A-Za-z0-9]+$/, 'ifsc code should only contain letters and numbers')
      .min(6, 'ifsc code should be at least 6 characters')
      .max(20, 'ifsc code should not exceed 20 characters'),
    panCard: Yup.string()
      .required('PAN Card Number is required')
      .matches(/^([A-Z]){5}([0-9]){4}([A-Z]){1}$/, 'Invalid PAN Card Number format'),

  })