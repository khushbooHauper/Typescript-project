import { Dispatch, SetStateAction } from "react";
import { TUser } from "./User";

export type TTablEProps = {
    users: TUser[];
    setUsers: Dispatch<SetStateAction<TUser[]>>;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    filteredList: TUser[];
    handleEdit: (user: TUser) => void;
    setEditMode: Dispatch<SetStateAction<boolean>>;
  }