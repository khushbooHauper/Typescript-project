import { Dispatch, SetStateAction } from "react";
import { TUser } from "./User";

export type TModaLProps = {
    addUser: (user: TUser) => void;
    id: number;
    curUser: TUser | null | {};
    editMode: boolean;
    users: TUser[];
    setUsers: Dispatch<SetStateAction<TUser[]>>;
    handleClose: () => void;
    open: boolean;
    handleAddUserClick: () => void;
  }