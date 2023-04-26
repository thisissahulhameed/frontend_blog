import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Users from "./components/AllUesrs";
import PostModal from "./components/PostModal";
import AllPost from "./components/AllPost";
import { useSelector } from "react-redux";
import Navigator from "./components/Navigator";

function App() {
  const token = useSelector((state) => state.token);
  console.log(token);
  return (
    <BrowserRouter>
      <Routes>
        {token ? (
          <Route path="/" element={<Navigator />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
        <Route path="/allPosts" element={<AllPost />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allUsers" element={<Users />} />
        <Route path="/userFriends" element={<Users />} />
        <Route path="/createPost" element={<PostModal />} />
        <Route path="/myPosts" element={<AllPost />} />
        <Route path="/friendsPosts" element={<AllPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
