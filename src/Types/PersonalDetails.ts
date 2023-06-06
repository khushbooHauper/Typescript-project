export type TPersonalDetailsData = {
    firstName?: string;
     lastName?: string;
     dob?: string;
     gender?: string;
     email?: string;
     phone?: string;
     address?: string;
     city?: string;
     state?: string;
     country?: string;
     pincode?: string;
}
export type TPersonalDetailsProps = {
    formData: TPersonalDetailsData;
    onError: (errors: object) => void;
    onSuccess: (data: object, node: string) => void;
  }