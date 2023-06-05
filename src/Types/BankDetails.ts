export type TBankDetailsData = {
    bank: string,
    accountNumber: string,
    ifsc: string,
    panCard: string,
}
export type TBankDetailsProps = {
    formData: TBankDetailsData;
    onError: (errors: object) => void;
    onSuccess: (data: object, node: string) => void;
  }