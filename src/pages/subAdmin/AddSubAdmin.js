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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "../../redux/Actions/adminAction.js";

export const AddSubAdmin = ({ dispatch, isLoading }) => {
  var classes = useStyles();
  const navigate = useNavigate();
  // const [userName, setUserName] = useState("");
  const [password, setPassword] = useState('');
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
        },
      },
      customer: {
        isPermited: false,
        addCustomer: false,
        listOfCustomer: {
          isPermited: false,
          updateCustomerStatus: false,
          updateCustomerChatStatus: false,
          updateCustomerCallStatus: false,
          editCustomer: false,
          viewCustomer: false,
          deleteCustomer: false,
        },
      },
    },
  });

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
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
    navigate("/display-sub-admin");
  };

  const handleSubmit = async () => {
    console.log("Testing 1");
    if (validation()) {
      const data = {
        username: userName,
        name: name,
        password: password,
        permissions: permission,
      };
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
          },
        },
      },
    });
  });

  const handlePermissionChange = (key) => {
    setState((prevState) => {
      const [mainKey, subKey] = key.split("."); // split key for nested properties
      const currentPermission =
        prevState.permission.astrologer[mainKey][subKey];
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

  const updatePermission = (path, value) => {
    setState((prevState) => {
      const updatedState = { ...prevState };
      const keys = path.split(".");

      let current = updatedState;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;

      return updatedState;
    });
  };

  const { userName, name, permission } = state;

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
              onChange={(e) => updateState({ userName: e.target.value })}
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
              type={showPassword ? "text" : "password"}
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
            <FormControl
              component="fieldset"
              style={{ marginLeft: "10px", marginLeft: "10px" }}
            >
              <FormLabel
                component="legend"
                style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
              >
                Permissions
              </FormLabel>
              <FormGroup aria-label="position" row>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permission.astrologer.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        checked={permission.astrologer.isPermited}
                        onChange={() => {
                          if (permission.astrologer.isPermited) {
                            updatePermission("permission.astrologer", {
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
                              },
                            });
                          } else {
                            updatePermission(
                              "permission.astrologer.isPermited",
                              true
                            );
                          }
                        }}
                      />
                    }
                    label={
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#10395D",
                          fontWeight: "600",
                          fontSize: "14px",
                        }}
                      >
                        Astrologer
                      </span>
                    }
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>
              <FormGroup
                aria-label="position"
                row
                style={{ marginLeft: "10px", marginRight: "10px" }}
              >
                <div className={classes.chips}>
                  <FormControlLabel
                    value={"Add Astrologer"}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permission.astrologer.isPermited}
                        checked={permission.astrologer.addAstrologer}
                        onChange={() => {
                          if (permission.astrologer.addAstrologer) {
                            updatePermission(
                              "permission.astrologer.addAstrologer",
                              false
                            );
                          } else {
                            updatePermission(
                              "permission.astrologer.addAstrologer",
                              true
                            );
                          }
                        }}
                      />
                    }
                    label={"Add Astrologer"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>
              <FormGroup
                aria-label="position"
                row
                style={{ marginLeft: "10px", marginRight: "10px" }}
              >
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permission.astrologer.listOfAstrologer.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permission.astrologer.isPermited}
                        checked={
                          permission.astrologer.listOfAstrologer.isPermited
                        }
                        onChange={() => {
                          if (
                            permission.astrologer.listOfAstrologer.isPermited
                          ) {
                            updatePermission(
                              "permission.astrologer.listOfAstrologer",
                              {
                                isPermited: false,
                                updateStatus: false,
                                updateChatStatus: false,
                                updateCallStatus: false,
                                editAstrologer: false,
                                viewAstrologer: false,
                                deleteAstrologer: false,
                              }
                            );
                          } else {
                            updatePermission(
                              "permission.astrologer.listOfAstrologer.isPermited",
                              true
                            );
                          }
                        }}
                      />
                    }
                    label={"List of Astrologers"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>
              <FormGroup
                aria-label="position"
                row
                style={{ marginLeft: "30px" }}
              >
                <div>
                  <FormControlLabel
                    value={permission.astrologer.listOfAstrologer.updateStatus}
                    control={
                      <Checkbox
                        disabled={
                          !permission.astrologer.isPermited ||
                          !permission.astrologer.listOfAstrologer.isPermited
                        }
                        checked={
                          permission.astrologer.listOfAstrologer.updateStatus
                        }
                        onChange={() => {
                          if (
                            permission.astrologer.listOfAstrologer.updateStatus
                          ) {
                            updatePermission(
                              "permission.astrologer.listOfAstrologer.updateStatus",
                              false
                            );
                          } else {
                            updatePermission(
                              "permission.astrologer.listOfAstrologer.updateStatus",
                              true
                            );
                          }
                        }}
                      />
                    }
                    label={"Update Status"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={"Update Chat Status"}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permission.astrologer.isPermited ||
                          !permission.astrologer.listOfAstrologer.isPermited
                        }
                        value={
                          permission.astrologer.listOfAstrologer
                            .updateChatStatus
                        }
                        checked={
                          permission.astrologer.listOfAstrologer
                            .updateChatStatus
                        }
                        onChange={() => {
                          if (
                            permission.astrologer.listOfAstrologer
                              .updateChatStatus
                          ) {
                            updatePermission(
                              "permission.astrologer.listOfAstrologer.updateChatStatus",
                              false
                            );
                          } else {
                            updatePermission(
                              "permission.astrologer.listOfAstrologer.updateChatStatus",
                              true
                            );
                          }
                        }}
                      />
                    }
                    label={"Update Chat Status"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={"Update Call Status"}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permission.astrologer.isPermited ||
                          !permission.astrologer.listOfAstrologer.isPermited
                        }
                        checked={
                          permission.astrologer.listOfAstrologer
                            .updateCallStatus
                        }
                        onChange={() => {
                          if (
                            permission.astrologer.listOfAstrologer
                              .updateCallStatus
                          ) {
                            updatePermission(
                              "permission.astrologer.listOfAstrologer.updateCallStatus",
                              false
                            );
                          } else {
                            updatePermission(
                              "permission.astrologer.listOfAstrologer.updateCallStatus",
                              true
                            );
                          }
                        }}
                      />
                    }
                    label={"Update Call Status"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={
                      permission.astrologer.listOfAstrologer.editAstrologer
                    }
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permission.astrologer.isPermited ||
                          !permission.astrologer.listOfAstrologer.isPermited
                        }
                        checked={
                          permission.astrologer.listOfAstrologer.editAstrologer
                        }
                        onChange={() => {
                          if (
                            permission.astrologer.listOfAstrologer
                              .editAstrologer
                          ) {
                            updatePermission(
                              "permission.astrologer.listOfAstrologer.editAstrologer",
                              false
                            );
                          } else {
                            updatePermission(
                              "permission.astrologer.listOfAstrologer.editAstrologer",
                              true
                            );
                          }
                        }}
                      />
                    }
                    label={"Edit Astrologer"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={
                      permission.astrologer.listOfAstrologer.viewAstrologer
                    }
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permission.astrologer.isPermited ||
                          !permission.astrologer.listOfAstrologer.isPermited
                        }
                        checked={
                          permission.astrologer.listOfAstrologer.viewAstrologer
                        }
                        onChange={() => {
                          if (
                            permission.astrologer.listOfAstrologer
                              .viewAstrologer
                          ) {
                            updatePermission(
                              "permission.astrologer.listOfAstrologer.viewAstrologer",
                              false
                            );
                          } else {
                            updatePermission(
                              "permission.astrologer.listOfAstrologer.viewAstrologer",
                              true
                            );
                          }
                        }}
                      />
                    }
                    label={"View Astrologer"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={
                      permission.astrologer.listOfAstrologer.deleteAstrologer
                    }
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permission.astrologer.isPermited ||
                          !permission.astrologer.listOfAstrologer.isPermited
                        }
                        checked={
                          permission.astrologer.listOfAstrologer
                            .deleteAstrologer
                        }
                        onChange={() => {
                          if (
                            permission.astrologer.listOfAstrologer.deleteAstrologer
                          ) {
                            updatePermission(
                              "permission.astrologer.listOfAstrologer.deleteAstrologer",
                              false
                            );
                          } else {
                            updatePermission(
                              "permission.astrologer.listOfAstrologer.deleteAstrologer",
                              true
                            );
                          }
                        }}
                      />
                    }
                    label={"Delete Astrologer"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              {/* Customer Permisiions  */}

              <FormGroup aria-label="position" row>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permission.customer.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        checked={permission.customer.isPermited}
                        onChange={() => {
                          if (permission.customer.isPermited) {
                            updatePermission("permission.customer", {
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
                              },
                            });
                          } else {
                            updatePermission(
                              "permission.customer.isPermited",
                              true
                            );
                          }
                        }}
                      />
                    }
                    label={
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#10395D",
                          fontWeight: "600",
                          fontSize: "14px",
                        }}
                      >
                        Customer
                      </span>
                    }
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>
              <FormGroup
                aria-label="position"
                row
                style={{ marginLeft: "10px", marginRight: "10px" }}
              >
                <div className={classes.chips}>
                  <FormControlLabel
                    value={"Add Customer"}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permission.customer.isPermited}
                        checked={permission.customer.addCustomer}
                        onChange={() => {
                          if (permission.customer.addCustomer) {
                            updatePermission(
                              "permission.customer.addCustomer",
                              false
                            );
                          } else {
                            updatePermission(
                              "permission.customer.addCustomer",
                              true
                            );
                          }
                        }}
                      />
                    }
                    label={"Add Customer"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>
              <FormGroup
                aria-label="position"
                row
                style={{ marginLeft: "10px", marginRight: "10px" }}
              >
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permission.customer.listOfCustomer.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permission.customer.isPermited}
                        checked={
                          permission.customer.listOfCustomer.isPermited
                        }
                        onChange={() => {
                          if (
                            permission.customer.listOfCustomer.isPermited
                          ) {
                            updatePermission(
                              "permission.customer.listOfCustomer",
                              {
                                isPermited: false,
                                updateStatus: false,
                                updateChatStatus: false,
                                updateCallStatus: false,
                                editAstrologer: false,
                                viewAstrologer: false,
                                deleteAstrologer: false,
                              }
                            );
                          } else {
                            updatePermission(
                              "permission.customer.listOfCustomer.isPermited",
                              true
                            );
                          }
                        }}
                      />
                    }
                    label={"List of Customer"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>
              <FormGroup
                aria-label="position"
                row
                style={{ marginLeft: "30px" }}
              >
                <div>
                  <FormControlLabel
                    value={permission.customer.listOfCustomer.updateCustomerStatus}
                    control={
                      <Checkbox
                        disabled={
                          !permission.customer.isPermited ||
                          !permission.customer.listOfCustomer.isPermited
                        }
                        checked={
                          permission.customer.listOfCustomer.updateCustomerStatus
                        }
                        onChange={() => {
                          if (
                            permission.customer.listOfCustomer.updateCustomerStatus
                          ) {
                            updatePermission(
                              "permission.customer.listOfCustomer.updateCustomerStatus",
                              false
                            );
                          } else {
                            updatePermission(
                              "permission.customer.listOfCustomer.updateCustomerStatus",
                              true
                            );
                          }
                        }}
                      />
                    }
                    label={"Update Customer Status"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={"Update Customer Chat Status"}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permission.customer.isPermited ||
                          !permission.customer.listOfCustomer.isPermited
                        }
                        value={
                          permission.customer.listOfCustomer
                            .updateCustomerChatStatus
                        }
                        checked={
                          permission.customer.listOfCustomer
                            .updateCustomerChatStatus
                        }
                        onChange={() => {
                          if (
                            permission.customer.listOfCustomer
                              .updateCustomerChatStatus
                          ) {
                            updatePermission(
                              "permission.customer.listOfCustomer.updateCustomerChatStatus",
                              false
                            );
                          } else {
                            updatePermission(
                              "permission.customer.listOfCustomer.updateCustomerChatStatus",
                              true
                            );
                          }
                        }}
                      />
                    }
                    label={"Update Customer Chat Status"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={"Update Customer Call Status"}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permission.customer.isPermited ||
                          !permission.customer.listOfCustomer.isPermited
                        }
                        checked={
                          permission.customer.listOfCustomer
                            .updateCustomerCallStatus
                        }
                        onChange={() => {
                          if (
                            permission.customer.listOfCustomer
                              .updateCustomerCallStatus
                          ) {
                            updatePermission(
                              "permission.customer.listOfCustomer.updateCustomerCallStatus",
                              false
                            );
                          } else {
                            updatePermission(
                              "permission.customer.listOfCustomer.updateCustomerCallStatus",
                              true
                            );
                          }
                        }}
                      />
                    }
                    label={"Update Customer Call Status"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={
                      permission.customer.listOfCustomer.editCustomer
                    }
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permission.customer.isPermited ||
                          !permission.customer.listOfCustomer.isPermited
                        }
                        checked={
                          permission.customer.listOfCustomer.editCustomer
                        }
                        onChange={() => {
                          if (
                            permission.customer.listOfCustomer
                              .editCustomer
                          ) {
                            updatePermission(
                              "permission.customer.listOfCustomer.editCustomer",
                              false
                            );
                          } else {
                            updatePermission(
                              "permission.customer.listOfCustomer.editCustomer",
                              true
                            );
                          }
                        }}
                      />
                    }
                    label={"Edit Customer"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={
                      permission.customer.listOfCustomer.viewCustomer
                    }
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permission.customer.isPermited ||
                          !permission.customer.listOfCustomer.isPermited
                        }
                        checked={
                          permission.customer.listOfCustomer.viewCustomer
                        }
                        onChange={() => {
                          if (
                            permission.customer.listOfCustomer
                              .viewCustomer
                          ) {
                            updatePermission(
                              "permission.customer.listOfCustomer.viewCustomer",
                              false
                            );
                          } else {
                            updatePermission(
                              "permission.customer.listOfCustomer.viewCustomer",
                              true
                            );
                          }
                        }}
                      />
                    }
                    label={"View Customer"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={
                      permission.customer.listOfCustomer.deleteCustomer
                    }
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permission.customer.isPermited ||
                          !permission.customer.listOfCustomer.isPermited
                        }
                        checked={
                          permission.customer.listOfCustomer
                            .deleteCustomer
                        }
                        onChange={() => {
                          if (
                            permission.customer.listOfCustomer.deleteCustomer
                          ) {
                            updatePermission(
                              "permission.customer.listOfCustomer.deleteCustomer",
                              false
                            );
                          } else {
                            updatePermission(
                              "permission.customer.listOfCustomer.deleteCustomer",
                              true
                            );
                          }
                        }}
                      />
                    }
                    label={"Delete Customer"}
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
