export type TExperienceFormValues = {
  company: string;
  designation: string;
  joiningDate: string;
  leavingDate: string;
}
export type TExperienceData = {
  experience: TExperienceFormValues[];
}
export type TExperienceProps = {
  formData?: TExperienceData;
  onError: (errors: object) => void;
  onSuccess: (data: TExperienceData, node: string) => void;
}