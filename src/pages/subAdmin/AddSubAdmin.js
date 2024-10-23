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
    email: "",
    name: "",
    type: "",
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
          addRecharge: false,
          editCustomer: false,
          viewCustomer: false,
          deleteCustomer: false,
        },
        chatHistory: {
          isPermited: false,
          viewChatMessages: false,
          viewChatHistoryData: false,
          delete: false,
          addReview: false,
          download: false,
        },
        callHistory: {
          isPermited: false,
          viewCallHistoryData: false,
          delete: false,
          addReview: false,
          download: false,
        },
        rechargeHistory: {
          isPermited: false,
          addRecharge: false,
          delete: false,
        },
        walletHistory: {
          isPermited: false,
        },
      },
      callDiscussion: {
        isPermited: false,
        viewCallDiscussion: {
          isPermited: false,
          edit: false,
          delete: false,
          add: false,
        },
      },
      courses: {
        isPermited: false,
        coursesList: {
          isPermited: false,
          status: false,
          edit: false,
          delete: false,
          add: false,
        },
        addCourses: {
          isPermited: false,
        },
        demoClass: {
          isPermited: false,
          adminStatus: false,
          classStatus: false,
          status: false,
          pdf: false,
          view: false,
          edit: false,
          delete: false,
        },
        liveClass: {
          isPermited: false,
          adminStatus: false,
          classStatus: false,
          status: false,
          pdf: false,
          view: false,
          edit: false,
          delete: false,
          classList: false,
          mcqQuestions: false,
          add: false,
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

    if (!email) {
      handleError("email", "Please Enter User Email");
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
    if (!type) {
      handleError("type", "Please input Type");
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
        email: email,
        name: name,
        password: password,
        type: type,
        permissions: permission,
      };
      dispatch(Actions.subadminAdd({ data, onAdd }));
      console.log("Testing");
    }
  };

  const handleReset = useCallback(() => {
    setPassword("");
    updateState({
      email: "",
      name: "",
      type: "",
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
            addRecharge: false,
            editCustomer: false,
            viewCustomer: false,
            deleteCustomer: false,
          },
          chatHistory: {
            isPermited: false,
            viewChatMessages: false,
            viewChatHistoryData: false,
            delete: false,
            addReview: false,
            download: false,

          },
          callHistory: {
            isPermited: false,
            viewCallHistoryData: false,
            delete: false,
            addReview: false,
            download: false,
          },
          rechargeHistory: {
            isPermited: false,
            addRecharge: false,
            delete: false,
            download: false,
          },
        },
        callDiscussion: {
          isPermited: false,
          edit: false,
          delete: false,
          add: false,
        },
        courses: {
          isPermited: false,
          coursesList: {
            isPermited: false,
            status: false,
            edit: false,
            delete: false,
            add: false,
          },
          addCourses: {
            isPermited: false
          },
          demoClass: {
            isPermited: false,
            adminStatus: false,
            classStatus: false,
            status: false,
            pdf: false,
            view: false,
            edit: false,
            delete: false,
          },
          liveClass: {
            isPermited: false,
            adminStatus: false,
            classStatus: false,
            status: false,
            pdf: false,
            view: false,
            edit: false,
            delete: false,
            classList: false,
            mcqQuestions: false,
            add: false,
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

  const { email, name, permission, type } = state;

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
              label="User Email"
              error={error.email ? true : false}
              helperText={error.email}
              value={email}
              onFocus={() => handleError("email", null)}
              onChange={(e) => updateState({ email: e.target.value })}
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
              onChange={(e) => updateState({ name: e.target.value })}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
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
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type"
                value={type}
                error={error.type ? true : false}
                onFocus={() => handleError("type", null)}
                onChange={(e) => updateState({ type: e.target.value })}
              >
                <MenuItem disabled value={null}>
                  -Select Type-
                </MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="subadmin">Sub-Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>


          {type !== 'admin' && (
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

                {/* Astrologer Permisiions  */}

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

                {/* List Of Customer */}
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
                      value={"Add Recharge"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.customer.isPermited ||
                            !permission.customer.listOfCustomer.isPermited
                          }
                          value={
                            permission.customer.listOfCustomer
                              .addRecharge
                          }
                          checked={
                            permission.customer.listOfCustomer
                              .addRecharge
                          }
                          onChange={() => {
                            if (
                              permission.customer.listOfCustomer
                                .addRecharge
                            ) {
                              updatePermission(
                                "permission.customer.listOfCustomer.addRecharge",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.customer.listOfCustomer.addRecharge",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Add Recharge"}
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

                {/* Chat History of Customer */}

                <FormGroup
                  aria-label="position"
                  row
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  <div className={classes.chips}>
                    <FormControlLabel
                      value={permission.customer.chatHistory.isPermited}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={!permission.customer.isPermited}
                          checked={
                            permission.customer.chatHistory.isPermited
                          }
                          onChange={() => {
                            if (
                              permission.customer.chatHistory.isPermited
                            ) {
                              updatePermission(
                                "permission.customer.chatHistory",
                                {
                                  isPermited: false,
                                  viewChatMessages: false,
                                  viewChatHistoryData: false,
                                  delete: false,
                                  addReview: false,
                                  download: false,
                                }
                              );
                            } else {
                              updatePermission(
                                "permission.customer.chatHistory.isPermited",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Chat History"}
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
                      value={permission.customer.chatHistory.viewChatMessages}
                      control={
                        <Checkbox
                          disabled={
                            !permission.customer.isPermited ||
                            !permission.customer.chatHistory.isPermited
                          }
                          checked={
                            permission.customer.chatHistory.viewChatMessages
                          }
                          onChange={() => {
                            if (
                              permission.customer.chatHistory.viewChatMessages
                            ) {
                              updatePermission(
                                "permission.customer.chatHistory.viewChatMessages",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.customer.chatHistory.viewChatMessages",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"View Chat Messages"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"View Chat History Data"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.customer.isPermited ||
                            !permission.customer.chatHistory.isPermited
                          }
                          value={
                            permission.customer.chatHistory
                              .viewChatHistoryData
                          }
                          checked={
                            permission.customer.chatHistory
                              .viewChatHistoryData
                          }
                          onChange={() => {
                            if (
                              permission.customer.chatHistory
                                .viewChatHistoryData
                            ) {
                              updatePermission(
                                "permission.customer.chatHistory.viewChatHistoryData",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.customer.chatHistory.viewChatHistoryData",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"View Chat History Data"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={
                        permission.customer.chatHistory.delete
                      }
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.customer.isPermited ||
                            !permission.customer.chatHistory.isPermited
                          }
                          checked={
                            permission.customer.chatHistory.delete
                          }
                          onChange={() => {
                            if (
                              permission.customer.chatHistory
                                .delete
                            ) {
                              updatePermission(
                                "permission.customer.chatHistory.delete",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.customer.chatHistory.delete",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Delete"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={
                        permission.customer.chatHistory.addReview
                      }
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.customer.isPermited ||
                            !permission.customer.chatHistory.isPermited
                          }
                          checked={
                            permission.customer.chatHistory.addReview
                          }
                          onChange={() => {
                            if (
                              permission.customer.chatHistory
                                .addReview
                            ) {
                              updatePermission(
                                "permission.customer.chatHistory.addReview",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.customer.chatHistory.addReview",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Add Review"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={
                        permission.customer.chatHistory.download
                      }
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.customer.isPermited ||
                            !permission.customer.chatHistory.isPermited
                          }
                          checked={
                            permission.customer.chatHistory
                              .download
                          }
                          onChange={() => {
                            if (
                              permission.customer.chatHistory.download
                            ) {
                              updatePermission(
                                "permission.customer.chatHistory.download",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.customer.chatHistory.download",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Download CSV"}
                      labelPlacement="end"
                    />
                  </div>
                </FormGroup>

                {/* Call History of Customer */}

                <FormGroup
                  aria-label="position"
                  row
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  <div className={classes.chips}>
                    <FormControlLabel
                      value={permission?.customer?.callHistory?.isPermited}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={!permission?.customer?.isPermited}
                          checked={permission?.customer?.callHistory?.isPermited}
                          onChange={() => {
                            if (permission?.customer?.callHistory?.isPermited) {
                              updatePermission(
                                "permission.customer.callHistory",
                                {
                                  isPermited: false,
                                  viewCallHistoryData: false,
                                  delete: false,
                                  addReview: false,
                                  download: false,
                                }
                              );
                            } else {
                              updatePermission(
                                "permission.customer.callHistory.isPermited",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Call History"}
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
                      value={"View Chat History Data"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission?.customer?.isPermited ||
                            !permission?.customer?.callHistory?.isPermited
                          }
                          value={permission?.customer?.callHistory?.viewCallHistoryData}
                          checked={permission?.customer?.callHistory?.viewCallHistoryData}
                          onChange={() => {
                            if (permission?.customer?.callHistory?.viewCallHistoryData) {
                              updatePermission(
                                "permission.customer.callHistory.viewCallHistoryData",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.customer.callHistory.viewCallHistoryData",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"View Call History Data"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={permission?.customer?.callHistory?.delete}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission?.customer?.isPermited ||
                            !permission?.customer?.callHistory?.isPermited
                          }
                          checked={permission?.customer?.callHistory?.delete}
                          onChange={() => {
                            if (permission?.customer?.callHistory?.delete) {
                              updatePermission(
                                "permission.customer.callHistory.delete",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.customer.callHistory.delete",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Delete"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={permission?.customer?.callHistory?.addReview}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission?.customer?.isPermited ||
                            !permission?.customer?.callHistory?.isPermited
                          }
                          checked={permission?.customer?.callHistory?.addReview}
                          onChange={() => {
                            if (permission?.customer?.callHistory?.addReview) {
                              updatePermission(
                                "permission.customer.callHistory.addReview",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.customer.callHistory.addReview",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Add Review"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={permission?.customer?.callHistory?.download}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission?.customer?.isPermited ||
                            !permission?.customer?.callHistory?.isPermited
                          }
                          checked={permission?.customer?.callHistory?.download}
                          onChange={() => {
                            if (permission?.customer?.callHistory?.download) {
                              updatePermission(
                                "permission.customer.callHistory.download",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.customer.callHistory.download",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Download CSV"}
                      labelPlacement="end"
                    />
                  </div>
                </FormGroup>

                {/* Recharge History of Customer */}

                <FormGroup
                  aria-label="position"
                  row
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  <div className={classes.chips}>
                    <FormControlLabel
                      value={permission?.customer?.rechargeHistory?.isPermited}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={!permission?.customer?.isPermited}
                          checked={permission?.customer?.rechargeHistory?.isPermited}
                          onChange={() => {
                            if (permission?.customer?.rechargeHistory?.isPermited) {
                              updatePermission(
                                "permission.customer.rechargeHistory",
                                {
                                  isPermited: false,
                                  addRecharge: false,
                                  delete: false,

                                }
                              );
                            } else {
                              updatePermission(
                                "permission.customer.rechargeHistory.isPermited",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Recharge History"}
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
                      value={permission?.customer?.rechargeHistory?.addRecharge}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission?.customer?.isPermited ||
                            !permission?.customer?.rechargeHistory?.isPermited
                          }
                          checked={permission?.customer?.rechargeHistory?.addRecharge}
                          onChange={() => {
                            if (permission?.customer?.rechargeHistory?.addRecharge) {
                              updatePermission(
                                "permission.customer.rechargeHistory.addRecharge",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.customer.rechargeHistory.addRecharge",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Add Recharge"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={permission?.customer?.rechargeHistory?.delete}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission?.customer?.isPermited ||
                            !permission?.customer?.rechargeHistory?.isPermited
                          }
                          checked={permission?.customer?.rechargeHistory?.delete}
                          onChange={() => {
                            if (permission?.customer?.rechargeHistory?.delete) {
                              updatePermission(
                                "permission.customer.rechargeHistory.delete",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.customer.rechargeHistory.delete",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Delete"}
                      labelPlacement="end"
                    />
                  </div>

                </FormGroup>

                {/* Wallet History of Customer */}

                <FormGroup
                  aria-label="position"
                  row
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  <div className={classes.chips}>
                    <FormControlLabel
                      value={permission?.customer?.walletHistory?.isPermited}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={!permission?.customer?.isPermited}
                          checked={permission?.customer?.walletHistory?.isPermited}
                          onChange={() => {
                            if (permission?.customer?.walletHistory?.isPermited) {
                              updatePermission(
                                "permission.customer.walletHistory",
                                {
                                  isPermited: false,
                                }
                              );
                            } else {
                              updatePermission(
                                "permission.customer.walletHistory.isPermited",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Wallet History"}
                      labelPlacement="end"
                    />
                  </div>
                </FormGroup>

                {/* !--- Call Discussion ---! */}
                <FormGroup aria-label="position" row>
                  <div className={classes.chips}>
                    <FormControlLabel
                      value={permission.callDiscussion?.isPermited}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          checked={permission.callDiscussion?.isPermited}
                          onChange={() => {
                            if (permission.callDiscussion?.isPermited) {
                              updatePermission("permission.callDiscussion", {
                                isPermited: false,
                                viewCallDiscussion: {
                                  isPermited: false,
                                  edit: false,
                                  delete: false,
                                  add: false,
                                },
                              });
                            } else {
                              updatePermission(
                                "permission.callDiscussion.isPermited",
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
                            fontSize: "14px",
                          }}
                        >

                          Call Discussion
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
                      value={permission.callDiscussion?.viewCallDiscussion?.isPermited}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={!permission.callDiscussion?.isPermited}
                          checked={
                            permission.callDiscussion?.viewCallDiscussion?.isPermited
                          }
                          onChange={() => {
                            if (
                              permission.callDiscussion?.viewCallDiscussion?.isPermited
                            ) {
                              updatePermission(
                                "permission.callDiscussion.viewCallDiscussion",
                                {
                                  isPermited: false,
                                  edit: false,
                                  delete: false,
                                  add: false,
                                }
                              );
                            } else {
                              updatePermission(
                                "permission.callDiscussion.viewCallDiscussion.isPermited",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"View Call Discussion"}
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
                      value={"Edit"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.callDiscussion?.isPermited ||
                            !permission.callDiscussion?.viewCallDiscussion?.isPermited
                          }
                          value={permission.callDiscussion?.viewCallDiscussion?.edit}
                          checked={permission.callDiscussion?.viewCallDiscussion?.edit}
                          onChange={() => {
                            if (
                              permission.callDiscussion?.viewCallDiscussion?.edit
                            ) {
                              updatePermission(
                                "permission.callDiscussion.viewCallDiscussion.edit",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.callDiscussion.viewCallDiscussion.edit",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Edit"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"Delete"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.callDiscussion?.isPermited ||
                            !permission.callDiscussion?.viewCallDiscussion?.isPermited
                          }
                          value={permission.callDiscussion?.viewCallDiscussion?.delete}
                          checked={permission.callDiscussion?.viewCallDiscussion?.delete}
                          onChange={() => {
                            if (
                              permission.callDiscussion?.viewCallDiscussion?.delete
                            ) {
                              updatePermission(
                                "permission.callDiscussion.viewCallDiscussion.delete",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.callDiscussion.viewCallDiscussion.delete",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Delete"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"Add"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.callDiscussion?.isPermited ||
                            !permission.callDiscussion?.viewCallDiscussion?.isPermited
                          }
                          checked={permission.callDiscussion?.viewCallDiscussion?.add}
                          onChange={() => {
                            if (
                              permission.callDiscussion?.viewCallDiscussion?.add
                            ) {
                              updatePermission(
                                "permission.callDiscussion.viewCallDiscussion.add",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.callDiscussion.viewCallDiscussion.add",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Add"}
                      labelPlacement="end"
                    />
                  </div>
                </FormGroup>

                {/* !--- Courses ---! */}

                <FormGroup aria-label="position" row>
                  <div className={classes.chips}>
                    <FormControlLabel
                      value={permission.courses?.isPermited}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          checked={permission.courses?.isPermited}
                          onChange={() => {
                            if (permission.courses?.isPermited) {
                              updatePermission("permission.courses", {
                                isPermited: false,
                                coursesList: {
                                  isPermited: false,
                                  status: false,
                                  edit: false,
                                  delete: false,
                                  add: false,
                                },
                              });
                            } else {
                              updatePermission(
                                "permission.courses.isPermited",
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
                            fontSize: "14px",
                          }}
                        >
                          Courses
                        </span>
                      }
                      labelPlacement="end"
                    />
                  </div>
                </FormGroup>
                {/* Courses List */}
                <FormGroup
                  aria-label="position"
                  row
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  <div className={classes.chips}>
                    <FormControlLabel
                      value={permission.courses?.coursesList?.isPermited}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={!permission.courses?.isPermited}
                          checked={
                            permission.courses?.coursesList?.isPermited
                          }
                          onChange={() => {
                            if (
                              permission.courses?.coursesList?.isPermited
                            ) {
                              updatePermission(
                                "permission.courses.coursesList",
                                {
                                  isPermited: false,
                                  status: false,
                                  edit: false,
                                  delete: false,
                                  add: false,
                                }
                              );
                            } else {
                              updatePermission(
                                "permission.courses.coursesList.isPermited",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Courses List"}
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
                      value={"Status"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.coursesList?.isPermited
                          }
                          value={permission.courses?.coursesList?.status}
                          checked={permission.courses?.coursesList?.status}
                          onChange={() => {
                            if (
                              permission.courses?.coursesList?.status
                            ) {
                              updatePermission(
                                "permission.courses.coursesList.status",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.coursesList.status",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Status"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"Edit"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.coursesList?.isPermited
                          }
                          value={permission.courses?.coursesList?.edit}
                          checked={permission.courses?.coursesList?.edit}
                          onChange={() => {
                            if (
                              permission.courses?.coursesList?.edit
                            ) {
                              updatePermission(
                                "permission.courses.coursesList.edit",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.coursesList.edit",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Edit"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"Delete"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.coursesList?.isPermited
                          }
                          value={permission.courses?.coursesList?.delete}
                          checked={permission.courses?.coursesList?.delete}
                          onChange={() => {
                            if (
                              permission.courses?.coursesList?.delete
                            ) {
                              updatePermission(
                                "permission.courses.coursesList.delete",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.coursesList.delete",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Delete"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"Add"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.coursesList?.isPermited
                          }
                          checked={permission.courses?.coursesList?.add}
                          onChange={() => {
                            if (
                              permission.courses?.coursesList?.add
                            ) {
                              updatePermission(
                                "permission.courses.coursesList.add",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.coursesList.add",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Add"}
                      labelPlacement="end"
                    />
                  </div>
                </FormGroup>

                {/* Add Courses */}

                {/* <FormGroup
                aria-label="position"
                row
                style={{ marginLeft: "10px", marginRight: "10px" }}
              >
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permission.courses?.addCourses?.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permission.courses?.isPermited}
                        checked={
                          permission.courses?.addCourses?.isPermited
                        }
                        onChange={() => {
                          if (
                            permission.courses?.addCourses?.isPermited
                          ) {
                            updatePermission(
                              "permission.courses.addCourses",
                              {
                                isPermited: false,

                              }
                            );
                          } else {
                            updatePermission(
                              "permission.courses.addCourses.isPermited",
                              true
                            );
                          }
                        }}
                      />
                    }
                    label={"Add Courses"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup> */}


                {/* Demo Class */}
                <FormGroup
                  aria-label="position"
                  row
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  <div className={classes.chips}>
                    <FormControlLabel
                      value={permission.courses?.demoClass?.isPermited}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={!permission.courses?.isPermited}
                          checked={
                            permission.courses?.demoClass?.isPermited
                          }
                          onChange={() => {
                            if (
                              permission.courses?.demoClass?.isPermited
                            ) {
                              updatePermission(
                                "permission.courses.demoClass",
                                {
                                  isPermited: false,
                                  adminStatus: false,
                                  classStatus: false,
                                  status: false,
                                  pdf: false,
                                  view: false,
                                  edit: false,
                                  delete: false,
                                }
                              );
                            } else {
                              updatePermission(
                                "permission.courses.demoClass.isPermited",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Demo Classes"}
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
                      value={"Admin Status"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.demoClass?.isPermited
                          }
                          value={permission.courses?.demoClass?.adminStatus}
                          checked={permission.courses?.demoClass?.adminStatus}
                          onChange={() => {
                            if (
                              permission.courses?.demoClass?.adminStatus
                            ) {
                              updatePermission(
                                "permission.courses.demoClass.adminStatus",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.demoClass.adminStatus",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Admin Status"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"Class Status"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.demoClass?.isPermited
                          }
                          value={permission.courses?.demoClass?.classStatus}
                          checked={permission.courses?.demoClass?.classStatus}
                          onChange={() => {
                            if (
                              permission.courses?.demoClass?.classStatus
                            ) {
                              updatePermission(
                                "permission.courses.demoClass.classStatus",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.demoClass.classStatus",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Class Status"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"Status"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.demoClass?.isPermited
                          }
                          value={permission.courses?.demoClass?.status}
                          checked={permission.courses?.demoClass?.status}
                          onChange={() => {
                            if (
                              permission.courses?.demoClass?.status
                            ) {
                              updatePermission(
                                "permission.courses.demoClass.status",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.demoClass.status",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Status"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"PDF"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.demoClass?.isPermited
                          }
                          value={permission.courses?.demoClass?.pdf}
                          checked={permission.courses?.demoClass?.pdf}
                          onChange={() => {
                            if (
                              permission.courses?.demoClass?.pdf
                            ) {
                              updatePermission(
                                "permission.courses.demoClass.pdf",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.demoClass.pdf",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"pdf"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"View"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.demoClass?.isPermited
                          }
                          checked={permission.courses?.demoClass?.view}
                          onChange={() => {
                            if (
                              permission.courses?.demoClass?.view
                            ) {
                              updatePermission(
                                "permission.courses.demoClass.view",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.demoClass.view",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"View"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"Edit"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.demoClass?.isPermited
                          }
                          checked={permission.courses?.demoClass?.edit}
                          onChange={() => {
                            if (
                              permission.courses?.demoClass?.edit
                            ) {
                              updatePermission(
                                "permission.courses.demoClass.edit",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.demoClass.edit",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Edit"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"Delete"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.demoClass?.isPermited
                          }
                          checked={permission.courses?.demoClass?.delete}
                          onChange={() => {
                            if (
                              permission.courses?.demoClass?.delete
                            ) {
                              updatePermission(
                                "permission.courses.demoClass.delete",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.demoClass.delete",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Delte"}
                      labelPlacement="end"
                    />
                  </div>
                </FormGroup>

                {/* Live Class */}
                <FormGroup
                  aria-label="position"
                  row
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  <div className={classes.chips}>
                    <FormControlLabel
                      value={permission.courses?.liveClass?.isPermited}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={!permission.courses?.isPermited}
                          checked={
                            permission.courses?.liveClass?.isPermited
                          }
                          onChange={() => {
                            if (
                              permission.courses?.liveClass?.isPermited
                            ) {
                              updatePermission(
                                "permission.courses.demoClass",
                                {
                                  isPermited: false,
                                  adminStatus: false,
                                  classStatus: false,
                                  status: false,
                                  pdf: false,
                                  view: false,
                                  edit: false,
                                  delete: false,
                                  classList: false,
                                  mcqQuestions: false,
                                  add: false,
                                }
                              );
                            } else {
                              updatePermission(
                                "permission.courses.liveClass.isPermited",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Live Classes"}
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
                      value={"Admin Status"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.liveClass?.isPermited
                          }
                          value={permission.courses?.liveClass?.adminStatus}
                          checked={permission.courses?.liveClass?.adminStatus}
                          onChange={() => {
                            if (
                              permission.courses?.liveClass?.adminStatus
                            ) {
                              updatePermission(
                                "permission.courses.liveClass.adminStatus",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.liveClass.adminStatus",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Admin Status"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"Class Status"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.liveClass?.isPermited
                          }
                          value={permission.courses?.liveClass?.classStatus}
                          checked={permission.courses?.liveClass?.classStatus}
                          onChange={() => {
                            if (
                              permission.courses?.liveClass?.classStatus
                            ) {
                              updatePermission(
                                "permission.courses.liveClass.classStatus",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.liveClass.classStatus",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Class Status"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"Status"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.liveClass?.isPermited
                          }
                          value={permission.courses?.liveClass?.status}
                          checked={permission.courses?.liveClass?.status}
                          onChange={() => {
                            if (
                              permission.courses?.liveClass?.status
                            ) {
                              updatePermission(
                                "permission.courses.liveClass.status",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.liveClass.status",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Status"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"PDF"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.liveClass?.isPermited
                          }
                          value={permission.courses?.liveClass?.pdf}
                          checked={permission.courses?.liveClass?.pdf}
                          onChange={() => {
                            if (
                              permission.courses?.liveClass?.pdf
                            ) {
                              updatePermission(
                                "permission.courses.liveClass.pdf",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.liveClass.pdf",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"pdf"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"View"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.liveClass?.isPermited
                          }
                          checked={permission.courses?.liveClass?.view}
                          onChange={() => {
                            if (
                              permission.courses?.liveClass?.view
                            ) {
                              updatePermission(
                                "permission.courses.liveClass.view",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.liveClass.view",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"View"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"Edit"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.liveClass?.isPermited
                          }
                          checked={permission.courses?.liveClass?.edit}
                          onChange={() => {
                            if (
                              permission.courses?.liveClass?.edit
                            ) {
                              updatePermission(
                                "permission.courses.liveClass.edit",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.liveClass.edit",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Edit"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"Delete"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.liveClass?.isPermited
                          }
                          checked={permission.courses?.liveClass?.delete}
                          onChange={() => {
                            if (
                              permission.courses?.liveClass?.delete
                            ) {
                              updatePermission(
                                "permission.courses.liveClass.delete",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.liveClass.delete",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Delete"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"MCQ"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.liveClass?.isPermited
                          }
                          checked={permission.courses?.liveClass?.mcqQuestions}
                          onChange={() => {
                            if (
                              permission.courses?.liveClass?.mcqQuestions
                            ) {
                              updatePermission(
                                "permission.courses.liveClass.mcqQuestions",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.liveClass.mcqQuestions",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"MCQ Questions"}
                      labelPlacement="end"
                    />
                  </div>
                  <div>
                    <FormControlLabel
                      value={"Add"}
                      className={classes.checkbox}
                      control={
                        <Checkbox
                          disabled={
                            !permission.courses?.isPermited ||
                            !permission.courses?.liveClass?.isPermited
                          }
                          checked={permission.courses?.liveClass?.add}
                          onChange={() => {
                            if (
                              permission.courses?.liveClass?.add
                            ) {
                              updatePermission(
                                "permission.courses.liveClass.add",
                                false
                              );
                            } else {
                              updatePermission(
                                "permission.courses.liveClass.add",
                                true
                              );
                            }
                          }}
                        />
                      }
                      label={"Add"}
                      labelPlacement="end"
                    />
                  </div>
                </FormGroup>

              </FormControl>
              {error.permission && (
                <div className={classes.errorstyles}>{error.permission}</div>
              )}
            </Grid>
          )}

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
  adminData: state.admin.adminData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddSubAdmin);
