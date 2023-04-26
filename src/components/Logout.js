import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLogout } from "../state/store";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseWithLogout = () => {
    dispatch(setLogout());
    setOpen(false);
    navigate("/");
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <LogoutIcon sx={{ color: "white" }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ fontSize: "15px" }} id="alert-dialog-title">
          Are You Sure, Do you want to Logout?
        </DialogTitle>

        <DialogActions>
          <Button
            variant="contained"
            color="success"
            sx={{ textTransform: "none" }}
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            onClick={handleCloseWithLogout}
            color="error"
            sx={{ textTransform: "none" }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
