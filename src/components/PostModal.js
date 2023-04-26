import { useFormik } from "formik";
import {
  Box,
  Button,
  Typography,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Navbar from "./Navbar";
import DrawerLeft from "./Drawer";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import ShowPost from "../components/ShowPost";
import BottomNavbar from "./BottomNavBar";

export default function PostModal() {
  const [titleLen, setTitleLen] = useState(0);
  const [contentLen, setContentLen] = useState(0);
  const token = useSelector((state) => state.token);
  const { _id, userName, email } = useSelector((state) => state.user);
  const matches = useMediaQuery("(max-width:700px)");

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(20, "title must be lesser than 20 characters")
        .required("Title required"),
      content: Yup.string()
        .max(1500, "content should not exceed 150 characters")
        .required("Content required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://blog-backend-sahul.onrender.com/createPost",
          {
            userId: _id,
            userName,
            email,
            title: values.title,
            content: values.content,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data, "post saved");
        values.title = "";
        values.content = "";
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <div>
      <Navbar />
      {!matches ? <DrawerLeft /> : null}
      <Box
        sx={
          matches
            ? {
                marginTop: "80px",
                marginLeft: "20px",
                marginRight: "10px",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
              }
            : {
                marginTop: "80px",
                marginLeft: "260px",
                marginRight: "70px",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
              }
        }
      >
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="title"
            name="title"
            label="Title"
            multiline
            maxRows={4}
            variant="standard"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            onChangeCapture={(e) =>
              setTitleLen(e.target.value.toString().length)
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography sx={{ fontSize: "10px", marginTop: "20px" }}>
                    {`${titleLen}/20`}
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
          {formik.touched.title && formik.errors.title ? (
            <div sx={{ marginLeft: "10px" }}>
              <Typography
                sx={{ color: "red", fontSize: "12px" }}
                variant="small"
              >
                {formik.errors.title}
              </Typography>
            </div>
          ) : null}
          <TextField
            sx={{ marginTop: "10px" }}
            id="content"
            name="content"
            label="Content"
            multiline
            rows={4}
            variant="standard"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
            onChangeCapture={(e) =>
              setContentLen(e.target.value.toString().length)
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography sx={{ fontSize: "10px", marginTop: "80px" }}>
                    {`${contentLen}/1500`}
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
          {formik.touched.content && formik.errors.content ? (
            <div>
              <Typography sx={{ color: "red", fontSize: "12px" }}>
                {formik.errors.content}
              </Typography>
            </div>
          ) : null}
          <Button
            type="submit"
            sx={{ mt: "10px", textTransform: "none" }}
            variant="contained"
          >
            Post
          </Button>
        </form>
      </Box>
      <ShowPost path={"myPosts"} />
      {matches ? <BottomNavbar /> : null}
    </div>
  );
}
