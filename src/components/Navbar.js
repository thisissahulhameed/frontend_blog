import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function Navbar() {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Blog
        </Typography>
        <Typography>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to="/createPost"
          >
            Write Blog
          </Link>
        </Typography>
        <Logout />
      </Toolbar>
    </AppBar>
  );
}
