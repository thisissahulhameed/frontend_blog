import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const location = useLocation();

  return (
    <div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {[
            ["Home", "allPosts"],
            ["My Posts", "myPosts"],
            ["Friends Post", "friendsPosts"],
            ["My Friends", "userFriends"],
            ["All Users", "allUsers"],
          ].map((item, index) => (
            <ListItem key={index}>
              <ListItemText>
                {location.pathname === "/" + item[1] ? (
                  <Link
                    style={{ textDecoration: "none", color: "#00337C" }}
                    to={"/" + item[1]}
                    state={{ path: item[1] }}
                  >
                    {item[0]}
                  </Link>
                ) : (
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={"/" + item[1]}
                    state={{ path: item[1] }}
                  >
                    {item[0]}
                  </Link>
                )}
              </ListItemText>
            </ListItem>
          ))}
          <Button
            style={{ textTransform: "none", marginLeft: "10px" }}
            variant="contained"
          >
            <Link
              style={{
                color: "white",
                textDecoration: "None",
              }}
              to="/createPost"
            >
              write blog
            </Link>
          </Button>
        </List>
      </Drawer>
    </div>
  );
}
