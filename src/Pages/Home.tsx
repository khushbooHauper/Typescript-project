import { useContext } from "react";
import SearchFilter from "../Components/Filter";
import ModaL from "../Components/ModaL";
import "../css/Layout.css";
import { TablE } from "../Components/Table";
import { HomeContext } from "../Contexts/HomeContextProvider";

function Home() {
  const { users } = useContext(HomeContext);

  return (
    <div className="container">
      {users.length > 0 ? (
        <div className="second-part">
          <h2>Employee List</h2>
          <div className="align-inline-box">
            <SearchFilter />
            <ModaL />
          </div>
          <TablE />
        </div>
      ) : (
        <div className="first-part">
          <ModaL />
        </div>
      )}
    </div>
  );
}

export default Home;
