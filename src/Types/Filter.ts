import { Dispatch, SetStateAction } from "react";

export type TSearchFilterProps = {
    setPage: Dispatch<SetStateAction<number>>;
    filter: string;
    setFilter: Dispatch<SetStateAction<string>>;
  }