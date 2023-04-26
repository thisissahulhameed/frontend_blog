import {
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function CommentBox({ postId }) {
  const [comment, setComment] = useState("");
  const token = useSelector((state) => state.token);
  const { userName } = useSelector((state) => state.user);
  const postComment = async () => {
    console.log("comment working")
    try {
      const res = await axios.put(
        `https://blog-backend-sahul.onrender.com/commentPost/${postId}`,
        {
          userName,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComment("")
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TextField
      id="comment"
      name="comment"
      label="comment"
      multiline
      rows={2}
      variant="standard"
      fullWidth
      sx={{ mt: "10px" }}
      value={comment}
      onChange={(e) => {
        setComment(e.target.value);
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Typography sx={{ fontSize: "10px", marginTop: "30px" }}>
              <IconButton onClick={postComment}>
                <SendIcon />
              </IconButton>
            </Typography>
          </InputAdornment>
        ),
      }}
    />
  );
}
