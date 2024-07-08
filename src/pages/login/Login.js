// Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { adminLoginRequest } from "../../redux/Actions/adminAction";
import { useStyles } from "../../assets/styles.js";
import { Grid } from "@mui/material";
import Swal from "sweetalert2";
import logo_icon from "../../assets/images/logo_icon.png";
import login_background from "../../assets/images/login_background.jpg";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validation = () => {
    return userEmail.length > 0 && password.length > 0;
  };

  const handleLogin = () => {
    if (validation()) {
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

  return (
    <div
      style={{
        backgroundImage: `url(${login_background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
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
                style={{ width: "5rem", height: "5rem" }}
              />
              <div className={classes.login}>Login to</div>
              <div className={classes.loginheading}>
                Fortune Talk Admin
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="label-float">
                <input
                  type="text"
                  placeholder=""
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <label>Username</label>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="label-float">
                <input
                  type="password"
                  placeholder=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Password</label>
              </div>
            </div>
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className="loginButton" onClick={handleLogin}>
              Login
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Login;
