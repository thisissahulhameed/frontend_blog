import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import Navbar from "./Navbar";
import DrawerLeft from "./Drawer";
import { useState, useEffect } from "react";
import axios from "axios";
import { setFriends } from "../state/store";
import { useLocation } from "react-router-dom";
import PostSkeleton from "./PostSekeleton";
import BottomNavBar from "./BottomNavBar";

const Users = () => {
  const location = useLocation();
  const { path } = location.state;
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const [users, setUsers] = useState([]);
  const matches = useMediaQuery("(max-width:700px)");
  useEffect(() => {
    axios
      .get(`https://blog-backend-sahul.onrender.com/${path}/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [_id,token,path]);
  // change made here _id,token are extra added in dep arr

  const isFriend = (friendId) => {
    return friends.find((id) => id === friendId);
  };

  const addOrRemoveFriends = async (friendId) => {
    const response = await fetch(
      `https://blog-backend-sahul.onrender.com/addOrRemoveFriends/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data.friends }));
  };
  return (
    <div>
      <Navbar />
      {!matches ? <DrawerLeft /> : null}
      {users.length > 0 ? (
        <Box component="main" sx={{ p: 1 }}>
          <Toolbar />
          <Box sx={{ p: 3 }}>
            <List
              sx={matches ? { marginLeft: "20px" } : { marginLeft: "240px" }}
            >
              {users.map((user) => (
                <ListItem
                  sx={{
                    backgroundColor: "white",
                    marginBottom: "10px",
                    borderRadius: "20px",
                  }}
                  alignItems="flex-start"
                  key={user._id}
                >
                  <ListItemAvatar>
                    <Avatar alt={user.userName} src="../static/default.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.userName}
                    secondary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {user.email}
                      </Typography>
                    }
                  />
                  {isFriend(user._id) ? (
                    <Button
                      onClick={() => addOrRemoveFriends(user._id)}
                      sx={{ mt: 2, textTransform: "none" }}
                      variant="outlined"
                    >
                      Friend
                    </Button>
                  ) : (
                    <Button
                      onClick={() => addOrRemoveFriends(user._id)}
                      sx={{ mt: 2, textTransform: "none" }}
                      variant="contained"
                    >
                      Add Friend
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      ) : (
        <PostSkeleton hei={100} />
      )}
      {matches ? <BottomNavBar /> : null}
    </div>
  );
};

export default Users;
