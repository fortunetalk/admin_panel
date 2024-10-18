import React, { useState, useCallback } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Grid,
  CircularProgress,
  InputAdornment,
  IconButton,
  Button,
  TextField,
  Select,
  Avatar,
  InputLabel,
  MenuItem,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormLabel,
  ListItemText,
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "../../redux/Actions/adminAction.js";

export const AddSubAdmin = ({ dispatch, isLoading }) => {
  var classes = useStyles();
  const navigate = useNavigate();
  // const [userName, setUserName] = useState("");
  const [password, setPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const [state, setState] = useState({
    userName: "",
    name: "",
    showPassword: "",
    permission: {
      astrologer: {
        isPermited: false,
        addAstrologer: false,
        listOfAstrologer: {
          isPermited: false,
          updateStatus: false,
          updateChatStatus: false,
          updateCallStatus: false,
          editAstrologer: false,
          viewAstrologer: false,
          deleteAstrologer: false,
        }
      }
    },
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };

  const handleExpertise = (item) => {
    if (permission.some((selectedItem) => selectedItem === item._id)) {
      const expertiesData = permission.filter(
        (selectedItem) => selectedItem !== item._id
      );
      updateState({ permission: expertiesData });
    } else {
      updateState({ permission: [...permission, item?._id] });
    }
    handleError("permission", null);
  };

  const updateState = (data) => {
    setState((prevState) => {
      const newData = { ...prevState, ...data };
      return newData;
    });
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

  const onAdd = () => {
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
      dispatch(Actions.subadminAdd({ data, onAdd }));
      console.log("Testing");
    }
  };

  const handleReset = useCallback(() => {
    setPassword("");
    updateState({
      userName: "",
      name: "",
      showPassword: "",
      permission: {
        astrologer: {
          isPermited: false,
          addAstrologer: false,
          listOfAstrologer: {
            isPermited: false,
            editAstrologer: false,
            upadateChatStatus: false,
          }
        },
      },
    });


  });


  // const handlePermissionChange = (permissionKey) => {
  //   setState((prevState) => {
  //     const currentPermission = prevState.permission.astrologer[permissionKey];
  //     return {
  //       ...prevState,
  //       permission: {
  //         ...prevState.permission,
  //         astrologer: {
  //           ...prevState.permission.astrologer,
  //           [permissionKey]: !currentPermission,
  //         },
  //       },
  //     };
  //   });
  // };
 
  const handlePermissionChange = (key) => {
    setState((prevState) => {
      const [mainKey, subKey] = key.split('.'); // split key for nested properties
      const currentPermission = prevState.permission.astrologer[mainKey][subKey];
      return {
        ...prevState,
        permission: {
          ...prevState.permission,
          astrologer: {
            ...prevState.permission.astrologer,
            [mainKey]: {
              ...prevState.permission.astrologer[mainKey],
              [subKey]: !currentPermission,
            },
          },
        },
      };
    });
  };


  const {
    userName,
    name,
    permission,
  } = state;

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
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <TextField
              label="User Name"
              error={error.userName ? true : false}
              helperText={error.userName}
              value={userName}
              onFocus={() => handleError("userName", null)}
              onChange={(e) => updateState({ name: e.target.value })}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <TextField
              label="Name"
              error={error.name ? true : false}
              helperText={error.name}
              value={name}
              onFocus={() => handleError("name", null)}
              onChange={(e) => updateState({ name: e.target.value })}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={4} sm={6} md={6} xs={6}>
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

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <FormControl component="fieldset" style={{ marginLeft: "10px", marginLeft: '10px' }}>
              <FormLabel component="legend" style={{ fontSize: "20px", fontWeight: '500', color: "black", }}>Permissions</FormLabel>
              <FormGroup aria-label="position" row>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permission.astrologer.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        checked={permission.astrologer.isPermited}
                        onChange={() => handlePermissionChange('isPermited')}
                      />
                    }
                    label={
                      <span style={{ fontWeight: 'bold', color: '#10395D', fontWeight: "600", fontSize: '14px' }}>
                        Astrologer
                      </span>
                    }
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>
              <FormGroup aria-label="position" row style={{ marginLeft: '10px', marginRight: '10px' }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={'Add Astrologer'}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        checked={permission.astrologer.addAstrologer}
                        onChange={() => handlePermissionChange('addAstrologer')}
                      />
                    }
                    label={'Add Astrologer'}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>
              <FormGroup aria-label="position" row style={{ marginLeft: '10px', marginRight: '10px' }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permission.astrologer.listOfAstrologer.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        checked={permission.astrologer.listOfAstrologer.isPermited}
                        onChange={() => handlePermissionChange('listOfAstrologer.isPermited')}
                      />
                    }
                    label={'List of Astrologers'}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>
              <FormGroup aria-label="position" row style={{ marginLeft: '30px' }}>
                <div>
                  <FormControlLabel
                    value={permission.astrologer.listOfAstrologer.updateStatus}
                    control={
                      <Checkbox
                        checked={permission.astrologer.listOfAstrologer.updateStatus}
                        onChange={() => handlePermissionChange('listOfAstrologer.updateStatus')}
                      />
                    }
                    label={'Update Status'}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={'Update Chat Status'}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        checked={permission.astrologer.listOfAstrologer.updateChatStatus}
                        onChange={() => handlePermissionChange('listOfAstrologer.updateChatStatus')}
                      />
                    }
                    label={'Update Chat Status'}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={'Update Call Status'}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        checked={permission.astrologer.listOfAstrologer.updateCallStatus}
                        onChange={() => handlePermissionChange('listOfAstrologer.updateCallStatus')}
                      />
                    }
                    label={'Update Call Status'}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={permission.astrologer.listOfAstrologer.editAstrologer}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        checked={permission.astrologer.listOfAstrologer.editAstrologer}
                        onChange={() => handlePermissionChange('listOfAstrologer.editAstrologer')}
                      />
                    }
                    label={'Edit Astrologer'}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={permission.astrologer.listOfAstrologer.viewAstrologer}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        checked={permission.astrologer.listOfAstrologer.viewAstrologer}
                        onChange={() => handlePermissionChange('listOfAstrologer.viewAstrologer')}
                      />
                    }
                    label={'View Astrologer'}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={permission.astrologer.listOfAstrologer.deleteAstrologer}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        checked={permission.astrologer.listOfAstrologer.deleteAstrologer}
                        onChange={() => handlePermissionChange('listOfAstrologer.deleteAstrologer')}
                      />
                    }
                    label={'Delete Astrologer'}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>
            </FormControl>
            {error.permission && (
              <div className={classes.errorstyles}>{error.permission}</div>
            )}
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
