// export interface User {
//     id: number;
//     PersonalDetails: {
//       firstName: string;
//       lastName: string;
//       dob: string;
//       gender: string;
//       email: string;
//       phone: string;
        //  address: string;
//       city: string;
//       state: string;
//       country: string;
//       pincode: string;
//     },
//     BankDetails:{
//       bank: string,
//       accountNumber: string,
//       ifsc: string,
//       panCard: string,
//     },
//     Education:{
//         education: {
//             courseName: string;
//             university: string;
//             percentage: string;
//             passingYear: string;
//           }[];
//     },
//     Experience:{
//         experience: {
//             company: string;
//             designation: string;
//             joiningDate: string;
//             leavingDate: string;
//           }[];
//     }
//   }
 


  
  export interface PersonalDetailsData {
         firstName: string;
          lastName: string;
          dob: string;
          gender: string;
          email: string;
          phone: string;
          address: string;
          city: string;
          state: string;
          country: string;
          pincode: string;
  }
  
  export interface BankDetailsData {
          bank: string,
          accountNumber: string,
          ifsc: string,
          panCard: string,
  }
  export interface EducationFormValues {
    courseName: string;
    university: string;
    percentage: string;
    passingYear: string;
  }
  export interface ExperienceFormValues {
    company: string;
    designation: string;
    joiningDate: string;
    leavingDate: string;
  }
  
  export interface EducationData {
    education: EducationFormValues[];
  }
  
  export interface ExperienceData {
    experience: ExperienceFormValues[];
  }
  
  export interface User {
    id: number;
    PersonalDetails?: PersonalDetailsData;
    BankDetails?: BankDetailsData;
    Education?: EducationData;
    Experience?: ExperienceData;
  }
  