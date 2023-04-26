import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  ListItemAvatar,
  Typography,
  ListItemText,
  ListItem,
  List,
  Avatar,
  Box,
  Divider,
  IconButton,
  Collapse,
  useMediaQuery,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentBox from "./CommentBox";
import ShowComment from "./ShowComment";
import PostSkeleton from "./PostSekeleton";
import Alert from "@mui/material/Alert";
import NoPost from "./NoPost";

export default function ShowPost({ path }) {
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [posts, setPosts] = useState([]);
  const [currentPostId, setCurrentPostId] = useState("");
  const [deleted, setDeleted] = useState("");
  const [isPostEmpty, setIsPostEmpty] = useState(false);
  const matches = useMediaQuery("(max-width:700px)");

  useEffect(() => {
    axios
      .get(`https://blog-backend-sahul.onrender.com/${path}/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPosts(res.data);
        if (res.data <= 0) {
          setIsPostEmpty(true);
        }
      })
      .catch((err) => console.log(err));
  }, [_id,token,path, posts]);
  // change made here _id , token are extra added in depend arr

  const isLiked = (id, post) => {
    return id in post;
  };

  const likePost = async (userId, postId) => {
    console.log("liked");
    await fetch(`https://blog-backend-sahul.onrender.com/likePost/${userId}/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await axios.get(`https://blog-backend-sahul.onrender.com/${path}/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPosts(res.data);
  };

  const deletePost = async (postId) => {
    console.log("this is working delete");
    await fetch(`https://blog-backend-sahul.onrender.com/deletePost/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDeleted("Post deleted Succesfully !");
    setTimeout(() => setDeleted(""), 5000);
  };
  return (
    <div>
      {posts.length > 0 ? (
        <Box sx={{ p: 3 }}>
          <List
            sx={
              matches
                ? { marginLeft: "20px", marginRight: "10px" }
                : { marginLeft: "240px", marginRight: "50px" }
            }
          >
            {deleted ? (
              <Alert sx={{ m: "5px" }} severity="success">
                {deleted}
              </Alert>
            ) : null}
            {posts.map((post) => (
              <ListItem
                sx={{
                  backgroundColor: "white",
                  marginBottom: "10px",
                  borderRadius: "20px",
                }}
                alignItems="flex-start"
                key={post._id}
              >
                <ListItemAvatar>
                  <Avatar alt={post.userName} src="../static/default.jpg" />
                </ListItemAvatar>
                <ListItemText>
                  <Typography sx={{ fontSize: "14px" }}>
                    {post.userName}
                  </Typography>

                  <Typography
                    sx={{ display: "inline", fontSize: "12px" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {post.email}
                  </Typography>
                  <Typography sx={{ fontSize: "16px", marginTop: "10px" }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {post.content}
                  </Typography>
                  <Divider sx={{ marginTop: "10px" }} />
                  <IconButton
                    size="small"
                    onClick={() => {
                      likePost(_id, post._id);
                    }}
                  >
                    {isLiked(_id, post.likes) ? (
                      <FavoriteIcon sx={{ color: "#00337C" }} />
                    ) : (
                      <FavoriteIcon />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setCurrentPostId(post._id);
                    }}
                    sx={{ ml: "5px" }}
                  >
                    <CommentOutlinedIcon />
                  </IconButton>
                  {path === "myPosts" ? (
                    <IconButton
                      onClick={() => deletePost(post._id)}
                      sx={{ ml: "5px" }}
                    >
                      <DeleteIcon sx={{ color: "#DF2E38" }} />
                    </IconButton>
                  ) : null}
                  {Object.keys(post.likes).length ? (
                    <Typography sx={{ pl: "3px" }} fontSize="13px">
                      {Object.keys(post.likes).length} likes
                    </Typography>
                  ) : null}
                  <Typography sx={{ fontSize: "10px" }}>
                    {post.date.toString().slice(0, 10)}{" "}
                  </Typography>
                  <Collapse
                    in={post._id === currentPostId}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CommentBox postId={post._id} />
                    <ShowComment post={post} />
                  </Collapse>
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : isPostEmpty ? (
        <NoPost />
      ) : (
        <PostSkeleton hei={130} />
      )}
    </div>
  );
}
