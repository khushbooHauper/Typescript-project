export type TEducationFormValues = {
    courseName: string;
    university: string;
    percentage: string;
    passingYear: string;
}
export type TEducationData = {
    education: TEducationFormValues[];
}
export type TEducationProps = {
    formData?: TEducationData;
    onError: (errors: object) => void;
    onSuccess: (data: TEducationData, node: string) => void;
  }