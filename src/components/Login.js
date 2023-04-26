import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import axios from "axios";
import { setLogin } from "../state/store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      nameOrEmail: "",
      password: "",
    },
    validationSchema: Yup.object({
      nameOrEmail: Yup.string()
        .max(25, "must be under 25 characters")
        .required("username or email is required"),
      password: Yup.string()
        .min(8, "Password must be 8 characters or more")
        .max(15, "Passwrod must be lesser than 15 characters")
        .required("password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const loggedCredintails = await axios.post("https://blog-backend-sahul.onrender.com", {
          nameOrEmail: values.nameOrEmail,
          password: values.password,
        });
        if (loggedCredintails) {
          dispatch(
            setLogin({
              user: loggedCredintails.data.user,
              token: loggedCredintails.data.token,
            })
          );
        }
        navigate("/allPosts", { state: { path: "allPosts" } });
      } catch (err) {
        if (err.response.data.message === "user not found") {
          formik.errors.nameOrEmail = err.response.data.message;
        }
        if (err.response.data.message === "password does not match") {
          formik.errors.password = err.response.data.message;
        }
      }
    },
  });

  return (
    <div>
      <Container
        sx={{
          backgroundColor: "white",
          marginTop: "20px",
          padding: "20px",
          borderRadius: "20px",
        }}
        component="main"
        maxWidth="xs"
      >
        <Avatar sx={{ bgcolor: "secondary.main", ml: 20 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography sx={{ ml: 15 }}>sign up to my app</Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="nameorEmail"
            name="nameOrEmail"
            type="text"
            label="username or email"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            onKeyUp={formik.handleBlur}
            value={formik.values.nameOrEmail}
            style={{ margin: "10px" }}
          />
          {formik.touched.nameOrEmail && formik.errors.nameOrEmail ? (
            <div sx={{ marginLeft: "10px" }}>
              <Typography
                style={{ color: "red", fontSize: "12px" }}
                variant="small"
              >
                {formik.errors.nameOrEmail}
              </Typography>
            </div>
          ) : null}
          <TextField
            id="password"
            type="password"
            name="password"
            label="password"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            onKeyUp={formik.handleBlur}
            value={formik.values.password}
            style={{ margin: "10px" }}
          />
          {formik.touched.password && formik.errors.password ? (
            <div style={{ marginLeft: "10px" }}>
              <Typography
                style={{ color: "red", fontSize: "12px" }}
                variant="small"
              >
                {formik.errors.password}
              </Typography>
            </div>
          ) : null}
          <Button
            fullWidth
            type="submit"
            style={{ margin: "10px" }}
            variant="contained"
          >
            sign up
          </Button>
        </form>

        <Link
          to="/register"
          style={{
            color: "blue",
            fontSize: "11px",
            marginLeft: "5px",
            textDecoration: "None",
          }}
        >
          Don't have an account? Sign in
        </Link>
      </Container>
    </div>
  );
};

export default Login;
