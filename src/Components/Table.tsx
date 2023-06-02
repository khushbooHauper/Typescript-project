import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Button, Modal } from "@mui/material";
import { Pagination } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import "../css/Table.css";
import { User } from "../Types";


interface TablEProps {
    users: User[];
    setUsers: Dispatch<SetStateAction<User[]>>;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    filteredList: User[];
    handleEdit: (user: User) => void;
    setEditMode: Dispatch<SetStateAction<boolean>>;
  }
  
export const TablE = ({
  users,
  setUsers,
  page,
  setPage,
  filteredList,
  handleEdit,
  setEditMode,
}:TablEProps) => {
  const [formData, setFormData] = useState<User | null>(null);
  const [deleteMode, setDeleteMode] = useState(false);

  const ITEMS_PER_PAGE = 5;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const handleCancel = () => {
    setEditMode(false);
    setDeleteMode(false);
    setFormData(null);
  };
  const handleChangePage = (_event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleDelete = (user:User) => {
    setFormData(user);
    setDeleteMode(true);
  };

  const handleConfirmDelete = () => {
    const updatedUsers = users.filter((user) => user.id !== formData?.id);
    setUsers(updatedUsers);
    setFormData(null);
    setDeleteMode(false);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <>
      <div className="container">
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Job Id</div>
            <div className="col col-2">Employee Name</div>
            <div className="col col-3">Age</div>
            <div className="col col-4">Gender</div>
            <div className="col col-5">Email</div>
            <div className="col col-6">Phone</div>
            <div className="col col-7">City</div>
            <div className="col col-8">State</div>
            <div className="col col-9">Country</div>
            <div className="col col-10">Pincode</div>
            <div className="col col-11">Actions</div>
          </li>
          {filteredList &&
            filteredList.slice(startIndex, endIndex).map((user, index) => (
              <li className="table-row" key={user.id}>
                <div className="col col-1" data-label="Job Id">
                  {user.id}
                </div>
                <div className="col col-2" data-label="Employee Name">
                  {user.PersonalDetails && user.PersonalDetails.firstName}{" "}
                  {user.PersonalDetails && user.PersonalDetails.lastName}
                </div>
                <div className="col col-3" data-label="age">
                  {moment().diff(user.PersonalDetails && user.PersonalDetails.dob, "years")}
                </div>
                <div className="col col-4" data-label="gender">
                  {user.PersonalDetails && user.PersonalDetails.gender}
                </div>
                <div className="col col-5" data-label="Email">
                  {user.PersonalDetails && user.PersonalDetails.email}
                </div>
                <div className="col col-6" data-label="Phone Number">
                  {user.PersonalDetails && user.PersonalDetails.phone}
                </div>
                <div className="col col-7" data-label="City">
                  {user.PersonalDetails && user.PersonalDetails.city}
                </div>
                <div className="col col-8" data-label="State">
                  {user.PersonalDetails && user.PersonalDetails.state}
                </div>
                <div className="col col-9" data-label="Country">
                  {user.PersonalDetails && user.PersonalDetails.country}
                </div>
                <div className="col col-10" data-label="Pincode">
                  {user.PersonalDetails && user.PersonalDetails.pincode}
                </div>
                <div className="col col-11" data-label="Actions">
                  <EditIcon
                    onClick={() => handleEdit(user)}
                    style={{ color: "#303f9f", cursor: "pointer" }}
                  />
                  <DeleteIcon
                    onClick={() => handleDelete(user)}
                    style={{ color: "#33cdd8", cursor: "pointer" }}
                  />
                </div>
              </li>
            ))}
        </ul>
        {deleteMode && (
          <Modal open={deleteMode} onClose={handleCancel}>
            <div
              style={{
                backgroundColor: "white",
                padding: "2rem",
                width: "600px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <p  style={{textAlign:'center'}}>
                Are you sure you want to delete this form data?
              </p>
              <div  style={{textAlign:'center'}}>
                <Button onClick={handleConfirmDelete} color="inherit">
                  Yes
                </Button>
                <Button onClick={handleCancel} color="inherit">
                  No
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>

      <div className="pagination-container">
        {users.length > 0 ? (
          <Pagination
            count={Math.ceil(users.length / ITEMS_PER_PAGE)}
            page={page}
            onChange={handleChangePage}
            style={{ color: "#303f9f", cursor: "pointer" }}
          />
        ) : (
          <h1>No Data Found</h1>
        )}
      </div>
    </>
  );
};
