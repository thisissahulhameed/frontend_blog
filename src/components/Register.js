import {
  TextField,
  Button,
  Container,
  Typography,
  Avatar,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      userName: Yup.string()
        .max(20, "User Name must be lesser than 20 characters")
        .required("User Name is requrired"),
      email: Yup.string()
        .email("Invalid email Address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be 8 characters or more")
        .max(15, "Passwrod must be lesser than 15 characters")
        .required("password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post("https://blog-backend-sahul.onrender.com/register", {
          firstName: values.firstName,
          lastName: values.lastName,
          userName: values.userName,
          email: values.email,
          password: values.password,
        });
        console.log(res);
        navigate("/")
      } catch (err) {
        if (err.response.data.message === "username has been taken") {
          formik.errors.userName = err.response.data.message;
        }
        if (err.response.data.message === "email has been taken") {
          formik.errors.email = err.response.data.message;
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
        <Typography sx={{ ml: 15 }}>sign in to my app</Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="firstName"
            name="firstName"
            type="text"
            label="First Name"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            style={{ margin: "10px" }}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div style={{ marginLeft: "10px" }}>
              <Typography
                style={{ color: "red", fontSize: "12px" }}
                variant="small"
              >
                {formik.errors.firstName}
              </Typography>
            </div>
          ) : null}
          <TextField
            id="lastName"
            name="lastName"
            type="text"
            label="Last Name"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            style={{ margin: "10px" }}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div style={{ marginLeft: "10px" }}>
              <Typography
                style={{ color: "red", fontSize: "12px" }}
                variant="small"
              >
                {formik.errors.lastName}
              </Typography>
            </div>
          ) : null}
          <TextField
            id="userName"
            name="userName"
            type="text"
            label="User Name"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
            style={{ margin: "10px" }}
          />
          {formik.touched.userName && formik.errors.userName ? (
            <div style={{ marginLeft: "10px" }}>
              <Typography
                style={{ color: "red", fontSize: "12px" }}
                variant="small"
              >
                {formik.errors.userName}
              </Typography>
            </div>
          ) : null}
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            style={{ margin: "10px" }}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ marginLeft: "10px" }}>
              <Typography
                style={{ color: "red", fontSize: "12px" }}
                variant="small"
              >
                {formik.errors.email}
              </Typography>
            </div>
          ) : null}
          <TextField
            id="password"
            name="password"
            type="password"
            label="Pasword"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            sign in
          </Button>
        </form>
        <Link
          to="/"
          style={{
            color: "blue",
            fontSize: "11px",
            marginLeft: "5px",
            textDecoration: "None",
          }}
        >
          Already have an account? Sign up
        </Link>
      </Container>
    </div>
  );
};

export default Register;
