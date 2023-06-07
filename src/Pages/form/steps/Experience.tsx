import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import {
  Formik,
  Form,
  FieldArray,
  Field,
  useFormik,
  FormikErrors,
} from "formik";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { useEffect } from "react";
import { ExperienceValidationSchema } from "../../../ValidationSchema/Experience";
import {
  TExperienceData,
  TExperienceFormValues,
  TExperienceProps,
} from "../../../Types/Experience";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

// Error object type
type FormErrors = FormikErrors<TExperienceFormValues>;

const initialValues: TExperienceData = {
  experience: [
    {
      company: "",
      designation: "",
      joiningDate: "",
      leavingDate: "",
    },
  ],
};

export const Experience = ({
  formData,
  onError,
  onSuccess,
}: TExperienceProps) => {
  const formik = useFormik<TExperienceData>({
    initialValues: formData || initialValues,
    validationSchema: ExperienceValidationSchema,
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
    const isAnyArrayEmpty = formik.values.experience.some((experience) => {
      return (
        !experience.company ||
        !experience.designation ||
        !experience.joiningDate ||
        !experience.leavingDate
      );
    });

    if (formik.isValid && !isAnyArrayEmpty) {
      onSuccess(formik.values, "Experience");
    } else {
      onError(formik.errors);
    }
  }, [formik.isValid, formik.values, onSuccess, onError]);
  return (
    <form onSubmit={handleSubmit}>
      <Formik
        initialValues={formData || initialValues}
        validationSchema={ExperienceValidationSchema}
        onSubmit={() => {}}
      >
        <Grid
          container
          spacing={2}
          style={{ marginTop: "40px", padding: "20px" }}
        >
          <Grid item sm={11}>
            <FieldArray
              name="experience"
              validateOnChange={false}
              render={() => (
                <Grid item xs={12}>
                  <div>
                    {values.experience.map((exp, index) => (
                      <Grid container key={index} spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h6">
                            {values.experience[index].designation ||
                              `Experience ${values.experience.length}`}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            name={`experience.${index}.company`}
                            label="company Name"
                            variant="outlined"
                            value={exp.company || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            error={
                              touched.experience &&
                              touched.experience[index] &&
                              touched.experience[index].company &&
                              errors.experience &&
                              errors.experience[index] &&
                              (errors.experience[index] as FormErrors)?.company
                                ? true
                                : false
                            }
                            helperText={
                              touched.experience &&
                              touched.experience[index] &&
                              touched.experience[index].company &&
                              errors.experience &&
                              errors.experience[index] &&
                              (errors.experience[index] as FormErrors)?.company
                                ? (errors.experience[index] as FormErrors)
                                    ?.company
                                : ""
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            name={`experience.${index}.designation`}
                            label="designation"
                            variant="outlined"
                            value={exp.designation || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            error={
                              touched.experience &&
                              touched.experience[index] &&
                              touched.experience[index].designation &&
                              errors.experience &&
                              errors.experience[index] &&
                              (errors.experience[index] as FormErrors)
                                ?.designation
                                ? true
                                : false
                            }
                            helperText={
                              touched.experience &&
                              touched.experience[index] &&
                              touched.experience[index].designation &&
                              errors.experience &&
                              errors.experience[index] &&
                              (errors.experience[index] as FormErrors)
                                ?.designation
                                ? (errors.experience[index] as FormErrors)
                                    ?.designation
                                : ""
                            }
                          />
                        </Grid>
                        {/* <Grid item xs={6}>
                          <TextField
                            fullWidth
                            name={`experience.${index}.joiningDate`}
                            label="joiningDate"
                            variant="outlined"
                            value={exp.joiningDate || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="date"
                            type="date"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            error={
                              touched.experience &&
                              touched.experience[index] &&
                              touched.experience[index].joiningDate &&
                              errors.experience &&
                              errors.experience[index] &&
                              (errors.experience[index] as FormErrors)
                                ?.joiningDate
                                ? true
                                : false
                            }
                            helperText={
                              touched.experience &&
                              touched.experience[index] &&
                              touched.experience[index].joiningDate &&
                              errors.experience &&
                              errors.experience[index] &&
                              (errors.experience[index] as FormErrors)
                                ?.joiningDate
                                ? (errors.experience[index] as FormErrors)
                                    ?.joiningDate
                                : ""
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            name={`experience.${index}.leavingDate`}
                            label="leavingDate"
                            variant="outlined"
                            value={exp.leavingDate || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="date"
                            type="date"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            error={
                              touched.experience &&
                              touched.experience[index] &&
                              touched.experience[index].leavingDate &&
                              errors.experience &&
                              errors.experience[index] &&
                              (errors.experience[index] as FormErrors)
                                ?.leavingDate
                                ? true
                                : false
                            }
                            helperText={
                              touched.experience &&
                              touched.experience[index] &&
                              touched.experience[index].leavingDate &&
                              errors.experience &&
                              errors.experience[index] &&
                              (errors.experience[index] as FormErrors)
                                ?.leavingDate
                                ? (errors.experience[index] as FormErrors)
                                    ?.leavingDate
                                : ""
                            }
                          />
                        </Grid> */}
                        <Grid item xs={12} sm={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="joiningDate"
                              format="MM-DD-YYYY"
                              value={
                                exp.joiningDate
                                  ? moment(exp.joiningDate, "YYYY-MM-DD")
                                  : null
                              }
                              onChange={(joiningDate) => {
                                console.log(
                                  "Selected joiningDate:",
                                  joiningDate
                                );
                                const formattedDate = joiningDate
                                  ? joiningDate.format("YYYY-MM-DD")
                                  : "";
                                formik.setFieldValue(
                                  `experience.${index}.joiningDate`,
                                  formattedDate
                                );
                              }}
                              slotProps={{
                                textField: {
                                  error:
                                    errors.experience &&
                                    errors.experience[index] &&
                                    (errors.experience[index] as FormErrors)
                                      ?.joiningDate
                                      ? true
                                      : false,
                                  helperText:
                                    errors.experience &&
                                    errors.experience[index] &&
                                    (errors.experience[index] as FormErrors)
                                      ?.joiningDate ? (
                                      <span
                                        style={{
                                          color:
                                            errors.experience &&
                                            errors.experience[index] &&
                                            (
                                              errors.experience[
                                                index
                                              ] as FormErrors
                                            )?.joiningDate
                                              ? "#d32f2f"
                                              : "#919191",
                                        }}
                                      >
                                        {
                                          (
                                            errors.experience[
                                              index
                                            ] as FormErrors
                                          )?.joiningDate
                                        }
                                      </span>
                                    ) : (
                                      ""
                                    ),
                                  style: {
                                    width: "100%", // Adjust the width as per your requirements
                                  },
                                  InputLabelProps: {
                                    style: {
                                      color:
                                        errors.experience &&
                                        errors.experience[index] &&
                                        (errors.experience[index] as FormErrors)
                                          ?.joiningDate
                                          ? "#d32f2f"
                                          : "#919191",
                                    },
                                  },
                                },
                              }}
                            />
                          </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="leavingDate"
                              format="MM-DD-YYYY"
                              value={
                                exp.leavingDate
                                  ? moment(exp.leavingDate, "YYYY-MM-DD")
                                  : null
                              }
                              onChange={(leavingDate) => {
                                console.log(
                                  "Selected leavingDate:",
                                  leavingDate
                                );
                                const formattedDate = leavingDate
                                  ? leavingDate.format("YYYY-MM-DD")
                                  : "";
                                formik.setFieldValue(
                                  `experience.${index}.leavingDate`,
                                  formattedDate
                                );
                              }}
                              slotProps={{
                                textField: {
                                  error:
                                    errors.experience &&
                                    errors.experience[index] &&
                                    (errors.experience[index] as FormErrors)
                                      ?.leavingDate
                                      ? true
                                      : false,
                                  helperText:
                                    errors.experience &&
                                    errors.experience[index] &&
                                    (errors.experience[index] as FormErrors)
                                      ?.leavingDate ? (
                                      <span
                                        style={{
                                          color:
                                            errors.experience &&
                                            errors.experience[index] &&
                                            (
                                              errors.experience[
                                                index
                                              ] as FormErrors
                                            )?.leavingDate
                                              ? "#d32f2f"
                                              : "#919191",
                                        }}
                                      >
                                        {
                                          (
                                            errors.experience[
                                              index
                                            ] as FormErrors
                                          )?.leavingDate
                                        }
                                      </span>
                                    ) : (
                                      ""
                                    ),
                                  style: {
                                    width: "100%", // Adjust the width as per your requirements
                                  },
                                  InputLabelProps: {
                                    style: {
                                      color:
                                        errors.experience &&
                                        errors.experience[index] &&
                                        (errors.experience[index] as FormErrors)
                                          ?.leavingDate
                                          ? "#d32f2f"
                                          : "#919191",
                                    },
                                  },
                                },
                              }}
                            />
                          </LocalizationProvider>
                        </Grid>

                        <Grid item xs={2}>
                          {values.experience.length > 1 && (
                            <IconButton
                              onClick={() => {
                                const currentValues = [...values.experience];
                                currentValues.splice(index, 1);
                                setFieldValue("experience", currentValues);
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
                  company: "",
                  designation: "",
                  joiningDate: "",
                  leavingDate: "",
                };
                const currentValues = values.experience || [];
                const isValid = currentValues.every((value) => {
                  return (
                    value.company &&
                    value.designation &&
                    value.joiningDate &&
                    value.leavingDate
                  );
                });

                if (isValid) {
                  setFieldValue("experience", [newValues, ...currentValues]);
                } else {
                  alert("Please fill all fields in the Experience section");
                }
              }}
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Formik>
    </form>
  );
};
