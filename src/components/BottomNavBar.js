import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import HomeIcon from "@mui/icons-material/Home";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

export default function BottomNavBar() {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
    navigate("/" + newValue, { state: { path: newValue } });
  };
  return (
    <Box>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigation
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Home"
            value="allPosts"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="My Posts"
            value="myPosts"
            icon={<PostAddIcon />}
          />
          <BottomNavigationAction
            label="Friend Posts"
            value="friendsPosts"
            icon={<PostAddIcon />}
          />
          <BottomNavigationAction
            label="My Friends"
            value="userFriends"
            icon={<PeopleAltIcon />}
          />
          <BottomNavigationAction
            label="All Users"
            value="allUsers"
            icon={<GroupAddIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
