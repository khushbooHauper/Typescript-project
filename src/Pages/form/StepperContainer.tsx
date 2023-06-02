import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PersonalDetails } from './steps/PersonalDetails';
import { Education } from './steps/Education';
import { Experience } from './steps/Experience';
import { BankDetails } from './steps/BankDetails';
import { BankDetailsData, EducationData, ExperienceData, PersonalDetailsData, User } from '../../Types';

  
  
  interface StepperContainerProps {
    addUser: (user: User) => void;
    handleClose: () => void;
    id: number;
    curUser: User | null | {};
    editMode: boolean;
    users: User[];
    setUsers: Dispatch<SetStateAction<User[]>>;
  }

const steps = ['PersonalDetails', 'BankDetails', 'Education', 'Experience'];

export default function StepperContainer({ addUser, handleClose, id, curUser,editMode ,users,setUsers}:StepperContainerProps) {

    ///+++++
    const [curRecord, setCurRecord] = useState<User | {}>(curUser || {});

    const [allowedNext, setAllowNext] = useState<boolean>(false);
    const [activeStep, setActiveStep] = useState<number>(0);
    console.log("curRecord", curRecord)

    const onSuccess = useCallback((data:object, node:string) => {

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
            case 0:(curRecord as User).PersonalDetails = data as PersonalDetailsData; break;
            case 1: (curRecord as User).BankDetails = data as BankDetailsData; break;
            case 2: (curRecord as User).Education = data as EducationData; break;
            case 3: (curRecord as User).Experience = data as ExperienceData; break;

        }
        console.log("on success got this data", data)
        setAllowNext(true)
    }, [activeStep])

    const onError = useCallback((data:object) => {
        console.log("on error got this data", data)
        setAllowNext(false)
    }, [])

    ///+++++

    const handleNext = () => {
        if (allowedNext) {
            if (activeStep === steps.length - 1) {
                const newUser:User = { ...curRecord, id: id + 1 };
                setCurRecord(newUser);
                addUser(curRecord as User);
                handleClose()
            } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        }
    };

      

    const handleUpdate = () => {
        const updatedUsers =users && users.map((user) =>
            user.id ===  (curRecord as User).id ? curRecord : user
        );
        setUsers(updatedUsers as User[]);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        handleClose()
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
            <div style={{maxHeight:'400px',overflowY:'auto'}}>
            <Box>
                {(() => {
                    switch (activeStep) {
                        case 0:
                            return <PersonalDetails
                                onSuccess={onSuccess}
                                onError={onError}
                                formData={(curRecord as User)?.PersonalDetails as PersonalDetailsData} />;
                        case 1:
                            return <BankDetails
                                onSuccess={onSuccess}
                                onError={onError}
                                formData={(curRecord as User)?.BankDetails as BankDetailsData} />;
                        case 2:
                            return <Education
                                onSuccess={onSuccess}
                                onError={onError}
                                formData={(curRecord as User)?.Education as EducationData} />;
                        case 3:
                            return <Experience
                                onSuccess={onSuccess}
                                onError={onError}
                                formData={(curRecord as User)?.Experience as ExperienceData}
                            />;
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
                

                    <Box sx={{display:'flex',justifyContent:'space-between'}}>
                        <Button
                            variant='contained'
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 ,mt:4}}
                        >
                            Back
                        </Button>
                       

                       {editMode && ( <Button onClick={handleUpdate} disabled={!allowedNext} variant='outlined'  sx={{ mr: 1 ,mt:4}}>
                            Update
                        </Button>)}
                        <Button onClick={handleNext} disabled={!allowedNext} variant='contained'  sx={{ mr: 1 ,mt:4}}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                
            )}
            </div>
        </Box>
    );
}


