import { useCallback, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { PersonalDetails } from "./steps/PersonalDetails";
import { Education } from "./steps/Education";
import { Experience } from "./steps/Experience";
import { BankDetails } from "./steps/BankDetails";
import { TStepperContainerProps } from "../../Types/StepperContainer";
import { TUser } from "../../Types/User";
import { TPersonalDetailsData } from "../../Types/PersonalDetails";
import { TBankDetailsData } from "../../Types/BankDetails";
import { TEducationData } from "../../Types/Education";
import { TExperienceData } from "../../Types/Experience";
import { HomeContext } from "../../Contexts/HomeContextProvider";

const steps = ["PersonalDetails", "BankDetails", "Education", "Experience"];

export default function StepperContainer() {
  const { users, setUsers, addUser, default_record, handleClose, editMode } =
    useContext(HomeContext);

  ///+++++
  const [curRecord, setCurRecord] = useState<TUser | {}>(default_record || {});

  const [allowedNext, setAllowNext] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  console.log("curRecord", curRecord);

  const onSuccess = useCallback(
    (data: object, node: string) => {
      // setCurRecord((curRecord)=>{
      //     if(curRecord[node].validated){
      //         return curRecord;
      //     }
      //     let t=JSON.parse(JSON.stringify(curRecord))
      //     t[node]=data;
      //     t[node].validated=true;
      //     return t;
      // })

      switch (activeStep) {
        case 0:
          (curRecord as TUser).PersonalDetails = data as TPersonalDetailsData;
          break;
        case 1:
          (curRecord as TUser).BankDetails = data as TBankDetailsData;
          break;
        case 2:
          (curRecord as TUser).Education = data as TEducationData;
          break;
        case 3:
          (curRecord as TUser).Experience = data as TExperienceData;
          break;
      }
      console.log("on success got this data", data);
      setAllowNext(true);
    },
    [activeStep]
  );

  const onError = useCallback((data: object) => {
    console.log("on error got this data", data);
    setAllowNext(false);
  }, []);

  ///+++++

  const handleNext = () => {
    if (allowedNext) {
      if (activeStep === steps.length - 1) {
        addUser(curRecord as TUser);
        handleClose();
      } else {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
      }
    }
  };

  const handleUpdate = () => {
    const updatedUsers =
      users &&
      users.map((user) =>
        user.id === (curRecord as TUser).id ? curRecord : user
      );
    setUsers(updatedUsers as TUser[]);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    handleClose();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Box>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        <Box>
          {(() => {
            switch (activeStep) {
              case 0:
                return (
                  <PersonalDetails
                    onSuccess={onSuccess}
                    onError={onError}
                    formData={
                      (curRecord as TUser)
                        ?.PersonalDetails as TPersonalDetailsData
                    }
                  />
                );
              case 1:
                return (
                  <BankDetails
                    onSuccess={onSuccess}
                    onError={onError}
                    formData={
                      (curRecord as TUser)?.BankDetails as TBankDetailsData
                    }
                  />
                );
              case 2:
                return (
                  <Education
                    onSuccess={onSuccess}
                    onError={onError}
                    formData={(curRecord as TUser)?.Education as TEducationData}
                  />
                );
              case 3:
                return (
                  <Experience
                    onSuccess={onSuccess}
                    onError={onError}
                    formData={
                      (curRecord as TUser)?.Experience as TExperienceData
                    }
                  />
                );
              default:
                return null;
            }
          })()}
        </Box>

        {activeStep === steps.length ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
          </>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1, mt: 4 }}
            >
              Back
            </Button>

            {editMode && (
              <Button
                onClick={handleUpdate}
                disabled={!allowedNext}
                variant="outlined"
                sx={{ mr: 1, mt: 4 }}
              >
                Update
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!allowedNext}
              variant="contained"
              sx={{ mr: 1, mt: 4 }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        )}
      </div>
    </Box>
  );
}
