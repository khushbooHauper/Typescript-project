import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { PersonnalDetailsValidationSchema } from "../../../ValidationSchema/PersonalDetails";
import moment from 'moment';
import { TPersonalDetailsProps } from "../../../Types/PersonalDetails";


const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
  dob: "",
  gender: "",
};


export const PersonalDetails = ({ formData, onError, onSuccess }:TPersonalDetailsProps) => {
const formik = useFormik({
    initialValues: formData || initialValues,
    validationSchema:PersonnalDetailsValidationSchema,
    onSubmit: () => {}
  });

  useEffect(() => {

    if (formik.isValidating) {
      // Form validation is in progress, do nothing
      return;
    }

    if (formik.isValid && !Object.values(formik.values).some((value) => value === '')) {
      onSuccess(formik.values, 'PersonalDetails');
    } else {
      onError(formik.errors);
    }
  }, [formik.isValidating, formik.isValid, formik.values, onSuccess, onError]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="dob"
            label="DOB"
            variant="outlined"
            fullWidth
            type="date" // Set the input type to 'date'
            InputLabelProps={{ shrink: true }} // Ensure the label shrinks when a value is entered
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dob && Boolean(formik.errors.dob)}
            helperText={formik.touched.dob && formik.errors.dob}
            inputProps={{
              max: moment().subtract(18, 'years').format('YYYY-MM-DD'), // Set the maximum date to 18 years ago
              min: moment().subtract(60, 'years').format('YYYY-MM-DD'), // Set the minimum date to 60 years ago
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth error={formik.touched.gender && Boolean(formik.errors.gender)}>
            <InputLabel id="gender-label" style={{ color: (formik.touched.gender && formik.errors.gender) ? '#d32f2f' : '#919191' }}>
              Gender
            </InputLabel>
            <Select
              labelId="gender-label"
              name="gender"
              label="Gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ color: (formik.touched.gender && formik.errors.gender) ? '#d32f2f' : 'black' }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="others">Others</MenuItem>
            </Select>
            {formik.touched.gender && formik.errors.gender && (
              <FormHelperText style={{ color: '#d32f2f' }}>{formik.errors.gender}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="phone"
            label="Phone"
            variant="outlined"
            fullWidth
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            name="address"
            label="address"
            variant="outlined"
            fullWidth
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            multiline  // add this prop to enable multiline input
            rows={2}   // add this prop to set the number of rows to show
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="city"
            label="City"
            variant="outlined"
            fullWidth
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="state"
            label="state"
            variant="outlined"
            fullWidth
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="country"
            label="country"
            variant="outlined"
            fullWidth
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="pincode"
            label="pincode"
            variant="outlined"
            fullWidth
            value={formik.values.pincode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pincode && Boolean(formik.errors.pincode)}
            helperText={formik.touched.pincode && formik.errors.pincode}
          />
        </Grid>
      </Grid>

    </form>
  );
};
