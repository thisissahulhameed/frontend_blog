import Navbar from "./Navbar";
import Drawer from "./Drawer";
import ShowPost from "./ShowPost";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import BottomNavBar from "./BottomNavBar";

export default function AllPost() {
  const location = useLocation();
  const { path } = location.state;
  const matches = useMediaQuery("(max-width:700px)");
  return (
    <div>
      <Navbar />
      {!matches ? <Drawer /> : null}
      <div style={{ marginTop: "50px" }}>
        <ShowPost path={path} />
      </div>
      {matches?<BottomNavBar/>:null}
    </div>
  );
}
