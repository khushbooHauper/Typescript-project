import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { TUser } from "../Types/User";
import { TPersonalDetailsData } from "../Types/PersonalDetails";
import moment from "moment";
import {
  THomeContextProps,
  THomeContextProviderProps,
} from "../Types/HomeContext";

const initialHomeContext: THomeContextProps = {
  users: [],
  setUsers: () => {},
  filter: "",
  setFilter: () => {},
  page: 1,
  setPage: () => {},
  addUser: () => {},
  filteredList: [],
  handleEdit: () => {},
  default_record: { id: 0 },
  handleClose: () => {},
  editMode: false,
  setEditMode: () => {},
  handleAddUserClick: () => {},
  open: false,
};
const HomeContext = createContext<THomeContextProps>(initialHomeContext);

const HomeContextProvider = ({ children }: THomeContextProviderProps) => {
  const storedUsers = localStorage.getItem("users");
  const hasStoredUsers = storedUsers !== null;
  const [hasUsers, setHasUsers] = useState<boolean>(hasStoredUsers);
  const [users, setUsers] = useState<TUser[]>(() => {
    return hasStoredUsers ? JSON.parse(storedUsers) : [];
  });
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");
  const [curRecord, setCurRecord] = useState<TUser | null>(null);
  const [showTable, setShowTable] = useState<boolean>(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setUsers(users);
  }, [users]);

  const handleOpen = () => {
    setOpen(true);
    setIsButtonClicked(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsButtonClicked(false);
    window.location.reload();
  };

  const filteredList =
    users &&
    users.filter((user: TUser) => {
      const personalDetails = user.PersonalDetails;
      const age = moment().diff(
        (personalDetails as TPersonalDetailsData).dob,
        "years"
      );

      return (
        Object.values(personalDetails as TPersonalDetailsData).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(filter.toLowerCase())
        ) || age.toString().toLowerCase().includes(filter.toLowerCase())
      );
    });

  // const addUser = (user: TUser) => {
  //   const highestId = Math.max(...users.map(user => user.id));
  //   const newId = highestId + 1;
  //   const newUser: TUser = { ...user, id: newId };

  //   const updatedUsers = [...users, newUser];

  //   setUsers(updatedUsers);
  //   localStorage.setItem("users", JSON.stringify(updatedUsers));
  //   setOpen(false);
  //   setShowTable(true);
  //   setShowFilter(true);
  // };

  const addUser = (user: TUser) => {
    let updatedUsers: TUser[] = [...users]; // Declare the variable here

    const existingUserIndex = updatedUsers.findIndex((u) => u.id === user.id);

    if (existingUserIndex !== -1) {
      // Update existing user
      updatedUsers[existingUserIndex] = user;
    } else {
      // Add new user
      const highestId = Math.max(...updatedUsers.map((u) => u.id));
      const newId = highestId + 1;
      const newUser: TUser = { ...user, id: newId };
      updatedUsers = [...updatedUsers, newUser]; // Assign the updated array
    }

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setOpen(false);
    setShowTable(true);
    setShowFilter(true);
  };

  let default_record = useMemo(() => {
    const highestId = Math.max(...users.map((user) => user.id));
    const newId = highestId + 1;

    if (curRecord === null) {
      return {
        id: newId,
      };
    }

    return curRecord;
  }, [curRecord, users]);

  const handleEdit = useCallback((user: TUser) => {
    setOpen(true);
    setEditMode(true);
    setCurRecord(user);
  }, []);

  const handleAddUserClick = () => {
    setOpen(true);
    setCurRecord(null);
    setEditMode(false);
    setShowTable(false); // Hide the table when "Add User" button is clicked
    setShowFilter(false); // Hide the filter when "Add User" button is clicked
    setIsButtonClicked(true);
  };
  const contextValue: THomeContextProps = {
    users,
    setUsers,
    filter,
    setFilter,
    page,
    setPage,
    addUser,
    filteredList,
    handleEdit,
    default_record,
    handleClose,
    editMode,
    setEditMode,
    handleAddUserClick,
    open,
  };
  return (
    <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
  );
};

export { HomeContext, HomeContextProvider };
