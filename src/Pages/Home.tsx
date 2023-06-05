import React, { useCallback, useEffect, useMemo, useState } from 'react'
import moment from 'moment';
import SearchFilter from '../Components/Filter';
import ModaL from '../Components/ModaL';
import '../css/Layout.css';
import { TablE } from '../Components/Table';
import { TUser } from '../Types/User';
import { TPersonalDetailsData } from '../Types/PersonalDetails';




function Home() {
  const storedUsers = localStorage.getItem('users');
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



  const handleOpen = () => {
    setOpen(true);
    setIsButtonClicked(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsButtonClicked(false);
  };




  const filteredList = users && users.filter((user:TUser) => {
    const personalDetails = user.PersonalDetails;
    const age = moment().diff((personalDetails as TPersonalDetailsData).dob, 'years');

    return Object.values(personalDetails as TPersonalDetailsData).some((value) =>
      value && value.toString().toLowerCase().includes(filter.toLowerCase())
    ) || age.toString().toLowerCase().includes(filter.toLowerCase());
  });



  useEffect(() => {
    setUsers(users);
  }, [users]);



  const addUser = (user:TUser) => {
    const updatedUsers = [...users]; // Create a deep copy of the users array

    if (user.id === users.length + 1) {
      updatedUsers.push(user); // Add the new user to the copied array
    } else {
      let index = updatedUsers.findIndex((t) => t.id === user.id);
      if (index >= 0) {
        updatedUsers[index] = user; // Update the specific user in the copied array
      } else {
        alert("Something went wrong");
        return;
      }
    }

    setUsers(updatedUsers); // Update the state with the copied array
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Save the copied array in local storage
    setOpen(false);
    setShowTable(true);
    setShowFilter(true);
  };


  let default_record = useMemo(() => {
    if (curRecord === null) {
      return {
        id: users.length + 1
      }
    }
    return curRecord;
  }, [curRecord, users])

  const handleEdit = useCallback((user:TUser) => {
    setOpen(true);
    setEditMode(true);
    setCurRecord(user);
  }, []);

  const handleAddUserClick = () => {
    setOpen(true);
    setCurRecord(null);
    setEditMode(false);
    setShowTable(false); // Hide the table when "Add User" button is clicked
    setShowFilter(false);// Hide the filter when "Add User" button is clicked
    setIsButtonClicked(true);
  };


  return (

    <div className="container">
      
      {users.length > 0 ? (<div className='second-part'>
       <h2>Employee List</h2>
        <div className='align-inline-box'>
        <SearchFilter setPage={setPage} filter={filter} setFilter={setFilter} />
        <ModaL open={open} handleClose={handleClose} users={users} setUsers={setUsers} addUser={addUser} id={users.length} curUser={default_record} editMode={editMode} handleAddUserClick={handleAddUserClick} />
        </div>
        
        <TablE users={users} setUsers={setUsers} page={page} setPage={setPage} filteredList={filteredList} handleEdit={handleEdit} setEditMode={setEditMode} />
      </div>
      
      ) 
      : (
        
      <div className='first-part'>
       <ModaL  open={open} handleClose={handleClose} users={users} setUsers={setUsers} addUser={addUser} id={users.length} curUser={default_record} editMode={editMode} handleAddUserClick={handleAddUserClick} />
     </div>)}


    </div>
  )
}

export default Home
