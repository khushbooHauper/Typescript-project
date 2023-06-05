import { Dispatch, SetStateAction } from "react";
import { TUser } from "./User";

export type TStepperContainerProps = {
    addUser: (user: TUser) => void;
    handleClose: () => void;
    id: number;
    curUser: TUser | null | {};
    editMode: boolean;
    users: TUser[];
    setUsers: Dispatch<SetStateAction<TUser[]>>;
  }