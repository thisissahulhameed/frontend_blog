import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
} from "@mui/material";

export default function ShowComment({ post }) {
  return (
    <List>
      {Object.keys(post.comments).length ? (
        <Typography sx={{ pl: "3px" }} fontSize="13px">
          {Object.keys(post.comments).length-1} comments
        </Typography>
      ) : null}
      {post.comments.map((cmt, key) => (
        <ListItem key={key}>
          {cmt.userName && cmt.comment ? (
            <ListItemAvatar>
              <Avatar alt={cmt.userName} src="../static/default.jpg" />
            </ListItemAvatar>
          ) : null}
          {cmt.userName && cmt.comment ? (
            <ListItemText>
              <Typography fontSize="14px">{cmt.userName}</Typography>
              <Typography fontSize="12px">{cmt.comment}</Typography>
            </ListItemText>
          ) : null}
        </ListItem>
      ))}
    </List>
  );
}
