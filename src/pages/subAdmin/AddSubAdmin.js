import React, { useState, useCallback } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Grid,
  TextField,
  CircularProgress,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "../../redux/Actions/adminAction.js";

export const AddSubAdmin = ({dispatch, isLoading }) => {
  var classes = useStyles();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [permission, setPermission] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
 
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

const handleOptionChange = (e) => {
    setPermission(e.target.value);
  };

  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };

  const validation = () => {
    var isValid = true;

    if (!userName) {
      handleError("userName", "Please Enter User Name");
      isValid = false;
    }
    if (!name) {
      handleError("name", "Please Enter Name");
      isValid = false;
    }
    if (!password) {
      handleError("password", "Please Enter password");
      isValid = false;
    }
   
    // if (!permission) {
    //     handleError("permission", "Please input Permission");
    //     isValid = false;
    //   }
    return isValid;
  };

  const onAdd =()=>{
    handleReset();
    navigate('/display-sub-admin')
  }

  const handleSubmit = async () => {
    console.log("Testing 1");
    if (validation()) {
      const data = {
        username: userName,
        name: name,
        password: password,
        permissions: permission,
      }
      dispatch(Actions.subadminAdd({data,onAdd}));
      console.log("Testing");
    }
  };

  const handleReset = useCallback(() => {
    setUserName("");
    setName("");
    setPassword("");
    setPermission([]);
 
  });

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add SubAdmin</div>
              <div
                onClick={() => navigate("/display-sub-admin")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display SubAdmins </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="User Name"
              error={error.userName ? true : false}
              helperText={error.userName}
              value={userName}
              onFocus={() => handleError("userName", null)}
              onChange={(event) => setUserName(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Name"
              error={error.name ? true : false}
              helperText={error.name}
              value={name}
              onFocus={() => handleError("name", null)}
              onChange={(event) => setName(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

           <Grid item lg={6} sm={6} md={6} xs={6}>
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
                InputProps={{
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

          <Grid item lg={6} sm={12} md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Select Permissions</InputLabel>
                <Select
                  labelId="select-label"
                  value={permission}
                  onChange={handleOptionChange}
                  variant="outlined"
                  error={!!error.permission}
                >
                  {/* <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="NotGood">Not Good</MenuItem>
                  <MenuItem value="Excelent">Excelent</MenuItem>
                  <MenuItem value="Average">Average </MenuItem> */}
                </Select>
                <div className={classes.errorstyles}>{error.permission}</div>
              </FormControl>
            </Grid>
          
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              {isLoading ? <CircularProgress size={24} /> : "Submit"}
            </div>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleReset} className={classes.denyButton}>
              Reset
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isLoading: state.gift.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddSubAdmin);
