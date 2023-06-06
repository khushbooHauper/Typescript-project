import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import {
  Formik,
  Form,
  FieldArray,
  Field,
  useFormik,
  FormikErrors,
} from "formik";
import * as Yup from "yup";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { useEffect } from "react";
import { EducationValidationSchema } from "../../../ValidationSchema/Education";
import { TEducationData, TEducationFormValues, TEducationProps } from "../../../Types/Education";



// Error object type
type FormErrors = FormikErrors<TEducationFormValues>;


const initialValues: TEducationData = {
  education: [
    { courseName: "", university: "", percentage: "", passingYear: "" },
  ],
};



export const Education = ({ formData, onError, onSuccess }: TEducationProps) => {
  const formik = useFormik<TEducationData>({
    initialValues: formData || initialValues,
    validationSchema: EducationValidationSchema,
    onSubmit: () => {},
  });

  const {
    values,
    handleChange,
    touched,
    errors,
    isValid,
    handleBlur,
    setFieldValue,
    handleSubmit,
  } = formik;
  useEffect(() => {
    const isAnyArrayEmpty = formik.values.education.some((education) => {
      return (
        !education.courseName ||
        !education.university ||
        !education.percentage ||
        !education.passingYear
      );
    });

    if (formik.isValid && !isAnyArrayEmpty) {
      onSuccess(formik.values, "Education");
    } else {
      onError(formik.errors);
    }
  }, [formik.isValid, formik.values, onSuccess, onError]);
  return (
    <form onSubmit={handleSubmit}>
      <Formik
        initialValues={formData || initialValues}
        validationSchema={EducationValidationSchema}
        onSubmit={() => {}}
      >
        <Grid
          container
          spacing={2}
          style={{ marginTop: "40px", padding: "20px" }}
        >
          <Grid item sm={11}>
            <FieldArray
              name="education"
              validateOnChange={false}
              render={() => (
                <Grid item xs={12}>
                  <div>
                    {values.education &&
                      values.education.map((edu, index) => (
                        <Grid container key={index} spacing={2}>
                          <Grid item xs={12}>
                            <Typography variant="h6">
                              {values.education[index].courseName ||
                                `Education ${values.education.length}`}
                            </Typography>
                          </Grid>

                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              name={`education.${index}.courseName`}
                              label="Course Name"
                              variant="outlined"
                              value={edu.courseName || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.education &&
                                touched.education[index] &&
                                touched.education[index].courseName &&
                                errors.education &&
                                errors.education[index] &&
                                (errors.education[index] as FormErrors)
                                  ?.courseName
                                  ? true
                                  : false
                              }
                              helperText={
                                touched.education &&
                                touched.education[index] &&
                                touched.education[index].courseName &&
                                errors.education &&
                                errors.education[index] &&
                                (errors.education[index] as FormErrors)
                                  ?.courseName
                                  ? (errors.education[index] as FormErrors)
                                      ?.courseName
                                  : ""
                              }
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              name={`education.${index}.university`}
                              label="University"
                              variant="outlined"
                              value={edu.university || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.education &&
                                touched.education[index] &&
                                touched.education[index].university &&
                                errors.education &&
                                errors.education[index] &&
                                (errors.education[index] as FormErrors)
                                  ?.university
                                  ? true
                                  : false
                              }
                              helperText={
                                touched.education &&
                                touched.education[index] &&
                                touched.education[index].university &&
                                errors.education &&
                                errors.education[index] &&
                                (errors.education[index] as FormErrors)
                                  ?.university
                                  ? (errors.education[index] as FormErrors)
                                      ?.university
                                  : ""
                              }
                            />
                          </Grid>

                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              name={`education.${index}.percentage`}
                              label="Percentage"
                              variant="outlined"
                              value={edu.percentage || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.education &&
                                touched.education[index] &&
                                touched.education[index].percentage &&
                                errors.education &&
                                errors.education[index] &&
                                (errors.education[index] as FormErrors)
                                  ?.percentage
                                  ? true
                                  : false
                              }
                              helperText={
                                touched.education &&
                                touched.education[index] &&
                                touched.education[index].percentage &&
                                errors.education &&
                                errors.education[index] &&
                                (errors.education[index] as FormErrors)
                                  ?.percentage
                                  ? (errors.education[index] as FormErrors)
                                      ?.percentage
                                  : ""
                              }
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              name={`education.${index}.passingYear`}
                              label="Passing Year"
                              variant="outlined"
                              value={edu.passingYear || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.education &&
                                touched.education[index] &&
                                touched.education[index].passingYear &&
                                errors.education &&
                                errors.education[index] &&
                                (errors.education[index] as FormErrors)
                                  ?.passingYear
                                  ? true
                                  : false
                              }
                              helperText={
                                touched.education &&
                                touched.education[index] &&
                                touched.education[index].passingYear &&
                                errors.education &&
                                errors.education[index] &&
                                (errors.education[index] as FormErrors)
                                  ?.passingYear
                                  ? (errors.education[index] as FormErrors)
                                      ?.passingYear
                                  : ""
                              }
                            />
                          </Grid>
                          <Grid item xs={2}>
                            {values.education.length > 1 && (
                              <IconButton
                                onClick={() => {
                                  const currentValues = [...values.education];
                                  currentValues.splice(index, 1);
                                  setFieldValue("education", currentValues);
                                }}
                              >
                                <RemoveIcon />
                              </IconButton>
                            )}
                          </Grid>
                        </Grid>
                      ))}
                  </div>
                </Grid>
              )}
            />
          </Grid>

          <Grid item sm={1}>
            <IconButton
              onClick={() => {
                const newValues = {
                  courseName: "",
                  university: "",
                  percentage: "",
                  passingYear: "",
                };
                const currentValues = values.education || [];
                const isValid = currentValues.every((value) => {
                  return (
                    value.courseName &&
                    value.university &&
                    value.percentage &&
                    value.passingYear
                  );
                });

                if (isValid) {
                  setFieldValue("education", [newValues, ...currentValues]);
                } else {
                  alert("Please fill all fields in the Education section");
                }
              }}
            >
              <AddIcon color="primary" />
            </IconButton>
          </Grid>
        </Grid>
      </Formik>
    </form>
  );
};
