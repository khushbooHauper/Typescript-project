import * as Yup from 'yup';

export const EducationValidationSchema = Yup.object().shape({
    education: Yup.array().of(
      Yup.object().shape({
        courseName: Yup.string()
          .required("Course name is required")
          .matches(
            /^[A-Za-z\s]+$/,
            "Course name must only contain letters and spaces"
          )
          .min(2, "Course name must be at least 2 characters")
          .max(50, "Course name must be at most 50 characters"),
        university: Yup.string()
          .required("university name is required")
          .matches(
            /^[A-Za-z\s]+$/,
            "university name must only contain letters and spaces"
          )
          .min(2, "university name must be at least 2 characters")
          .max(50, "university name must be at most 50 characters"),
        percentage: Yup.number()
          .typeError("Percentage must be a number")
          .min(0, "Percentage must be greater than or equal to 0")
          .max(100, "Percentage must be less than or equal to 100")
          .required("Percentage is required"),
        passingYear: Yup.number()
          .typeError("Passing year must be a number")
          .integer("Passing year must be an integer")
          .min(1900, "Passing year must be after 1900")
          .max(new Date().getFullYear(), "Passing year cannot be in the future")
          .required("Passing year is required"),
      })
    ),
  });
  