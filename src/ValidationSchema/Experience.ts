import * as Yup from 'yup';
import moment from 'moment';

export const ExperienceValidationSchema = Yup.object().shape({
    experience: Yup.array().of(
      Yup.object().shape({
        company: Yup.string()
          .required("company name is required")
          .matches(
            /^[A-Za-z\s]+$/,
            "company name must only contain letters and spaces"
          )
          .min(2, "company name must be at least 2 characters")
          .max(50, "company name must be at most 50 characters"),
        designation: Yup.string()
          .required("designation is required")
          .matches(
            /^[A-Za-z\s]+$/,
            "designation must only contain letters and spaces"
          )
          .min(2, "designation must be at least 2 characters")
          .max(50, "designation must be at most 50 characters"),
        joiningDate: Yup.date().required("Joining date is required"),
        leavingDate: Yup.date()
          .required("Leaving date is required")
          .notOneOf(
            [Yup.ref("joiningDate")],
            "Leaving date cannot be the same as joining date"
          )
          .min(
            Yup.ref("joiningDate"),
            "Leaving date cannot be before joining date"
          )
          .test(
            "minimum-experience",
            "Minimum 6 months experience required",
            function (leavingDate) {
              const joiningDate = this.parent.joiningDate;
              const sixMonthsAgo = moment(joiningDate).add(6, "months"); // Modify to add 6 months instead of subtracting
              const isAfterSixMonths = moment(leavingDate).isSameOrAfter(
                sixMonthsAgo,
                "day"
              );
              return isAfterSixMonths || !leavingDate; // Allow empty leaving date
            }
          )
          .test(
            "future-date",
            "Leaving date cannot be in the future",
            function (leavingDate) {
              return moment(leavingDate).isSameOrBefore(moment(), "day");
            }
          )
          .test(
            "not-same-date",
            "Joining date and leaving date cannot be the same",
            function (leavingDate) {
              const joiningDate = this.parent.joiningDate;
              return moment(leavingDate).isAfter(joiningDate, "day");
            }
          ),
      })
    ),
  });