// Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { adminLoginRequest } from "../../redux/Actions/adminAction";
import { useStyles } from "../../assets/styles.js";
import {
  Grid,
  TextField,
  CircularProgress,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import Swal from "sweetalert2";
import logo_icon from "../../assets/images/logo_icon.png";
import login_background from "../../assets/images/login_background.jpg";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Person } from '@mui/icons-material';

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubAdmin, setIsSubAdmin] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validation = () => {
    return userEmail.length > 0 && password.length > 0;
  };

  const handleLogin = () => {
    if (validation()) {

      // dispatch(adminLoginRequest({ email: userEmail, password, type: isSubAdmin? 'subadmin' : 'admin'}));
      dispatch(adminLoginRequest({ email: userEmail, password }));

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        setTimeout(() => {
          navigate('/');
        }, 1500);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please fill in both fields',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };


//   const onAdd = () => {
//     navigate('/')
//   }

//   const handleLogin = () => {
//     if (validation()) {

//       const data = {
//         email: userEmail,
//         password,
//         type: isSubAdmin ? 'subadmin' : 'admin'
//       }
//       dispatch(adminLoginRequest({data, onAdd }));
//   }
// };

  return (
    <div
      style={{
        // background: "#10395D",
        background: "linear-gradient(135deg, #10395D, #1A4B6D, #2C678C, #4A8FB6, #D3D3D3)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={classes.loginBox}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.loginheadingContainer}>
              <img
                src={logo_icon}
                alt="logo"
                style={{ width: "8.5rem", height: "8.5rem" }}
              />
              {/* <div className={classes.login}>Login to</div> */}
              <div className={classes.login}> </div>
              <div className={classes.loginheading}>
                Fortune Talk Admin
              </div>
            </div>
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              label="Username"
              fullWidth
              type="text"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              variant="outlined"
              InputLabelProps={{
                style: { backgroundColor: "transparent", color: 'black' },
                shrink: true, // Keeps the label above the field when focused or filled
              }}
              InputProps={{

                style: { backgroundColor: 'white', color: 'black' }, // Background and text color for input
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onMouseDown={(event) => event.preventDefault()} // Prevents focus loss
                      edge="end"
                    >
                      <Person />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              id="outlined-description-static"
              label="Password"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              variant="outlined"
              error={!!error.password}
              helperText={error.password}
              InputLabelProps={{
                shrink: true, // Keeps the label above the field when focused or filled
              }}
              InputProps={{
                style: { backgroundColor: 'white', color: 'black' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      onMouseDown={(event) => event.preventDefault()} // Prevents focus loss
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSubAdmin} // Control the checkbox with state
                    onChange={(e) => setIsSubAdmin(e.target.checked)} // Update state on change
                  />
                }
                label="Logging in as a sub-admin"
              />
            </FormGroup>
          </Grid>

        </Grid>

      </div>
      <Grid item lg={12} sm={12} md={12} xs={12}>
        <div className="loginButton" onClick={handleLogin}>
          Login
        </div>
      </Grid>
    </div>
  );
};

export default Login;
