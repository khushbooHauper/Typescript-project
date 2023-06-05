import { ReactNode } from "react";
import { TUser } from "./User";

export type THomeContextProps = {
    users: TUser[];
    setUsers: React.Dispatch<React.SetStateAction<TUser[]>>;
    filter: string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    addUser: (user: TUser) => void;
    filteredList: TUser[];
    handleEdit: (user: TUser) => void;
    default_record: TUser | { id: number };
    handleClose: () => void;
    editMode: boolean;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    handleAddUserClick: () => void;
    open: boolean;
  };

  export type THomeContextProviderProps = {
    children: ReactNode;
  };