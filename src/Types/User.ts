import { TBankDetailsData } from "./BankDetails";
import { TEducationData } from "./Education";
import { TExperienceData } from "./Experience";
import { TPersonalDetailsData } from "./PersonalDetails";

export type TUser = {
    id: number;
    PersonalDetails?: TPersonalDetailsData;
    BankDetails?: TBankDetailsData;
    Education?: TEducationData;
    Experience?: TExperienceData;
  }