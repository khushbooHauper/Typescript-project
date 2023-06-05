import StepperContainer from "../Pages/form/StepperContainer";
import { Box, Button, Modal } from "@mui/material";
import "../css/ModaL.css";
import { HomeContext } from "../Contexts/HomeContextProvider";
import { useContext } from "react";

export default function ModaL() {
  const { handleClose, handleAddUserClick, open } = useContext(HomeContext);

  return (
    <div>
      {!open && (
        <div className="add-employee-btn-div">
          <Button onClick={handleAddUserClick} variant="contained">
            Add Employee
          </Button>
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box className="modalBoxStyle">
          <StepperContainer />
        </Box>
      </Modal>
    </div>
  );
}
