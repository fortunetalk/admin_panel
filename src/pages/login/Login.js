import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import { Avatar, Grid, IconButton, TextField, Button } from "@mui/material";
import Swal from "sweetalert2";
import logo_icon from "../../assets/images/logo_icon.png";
import { Colors } from "../../assets/styles.js";
import { useNavigate } from "react-router-dom";
import login_background from "../../assets/images/login_background.jpg";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const validation = () => {
    var valid = true;
    if (userEmail.length == 0) {
      valid = false;
    }
    if (password.length == 0) {
      valid = false;
    }
    return valid;
  };

  const handleLogin = () => {
    if (validation()) {
      try {
        localStorage.setItem("userDetails", userEmail);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }

      try {
        navigate("/");
      } catch (error) {
        console.log(error);
      }
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
              <img src={logo_icon} style={{ width: "5rem", height: "5rem" }} />
              <div className={classes.login}>Login to</div>
              <div className={classes.loginheading}>Fortune Talk Admin</div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div class="label-float">
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
              <div class="label-float">
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
            <div class="loginButton" onClick={handleLogin}>
              Login
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Login;
