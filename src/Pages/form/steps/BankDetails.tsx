import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { BankDetailsValidationSchema } from "../../../ValidationSchema/BankDetails";
import { TBankDetailsProps } from "../../../Types/BankDetails";


const initialValues = {
  bank: "",
  accountNumber: "",
  ifsc: "",
  panCard: "",

};

export const BankDetails= ({ formData, onError, onSuccess }:TBankDetailsProps) => {
  const formik = useFormik({
    initialValues: formData || initialValues,
    validationSchema: BankDetailsValidationSchema,
    onSubmit: () => {}
  });

  useEffect(() => {
    if (formik.isValidating) {
      // Form validation is in progress, do nothing
      return;
    }

    if (formik.isValid && !Object.values(formik.values).some((value) => value === '')) {
      onSuccess(formik.values, 'BankDetails');
    } else {
      onError(formik.errors);
    }
  }, [formik.isValidating, formik.isValid, formik.values, onSuccess, onError]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3} style={{ marginTop: "10px" }}>
        <Grid item xs={12} sm={12}>
          <TextField
            name="bank"
            label="Bank Name"
            variant="outlined"
            fullWidth
            value={formik.values.bank}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.bank && Boolean(formik.errors.bank)}
            helperText={formik.touched.bank && formik.errors.bank}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            name="accountNumber"
            label="Account Number"
            variant="outlined"
            fullWidth
            value={formik.values.accountNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.accountNumber &&
              Boolean(formik.errors.accountNumber)
            }
            helperText={
              formik.touched.accountNumber && formik.errors.accountNumber
            }
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            name="ifsc"
            label="IFSC Code"
            variant="outlined"
            fullWidth
            value={formik.values.ifsc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.ifsc && Boolean(formik.errors.ifsc)}
            helperText={formik.touched.ifsc && formik.errors.ifsc}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            name="panCard"
            label="PAN Number"
            variant="outlined"
            fullWidth
            value={formik.values.panCard}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.panCard && Boolean(formik.errors.panCard)}
            helperText={formik.touched.panCard && formik.errors.panCard}
          />
        </Grid>
      </Grid>

    </form>
  );
};
