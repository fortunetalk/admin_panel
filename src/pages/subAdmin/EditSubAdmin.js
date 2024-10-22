import React, { useState, useEffect } from "react";
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
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "../../redux/Actions/adminAction.js";

export const EditSubAdmin = ({ dispatch, isLoading, subAdminByIdData }) => {
  const { _id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [state, setState] = useState({
    email: "",
    name: "",
    type: "",
    plainPassword: "", // Changed this to plainPassword
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
    },
  });

  useEffect(() => {
    dispatch(Actions.getSubAdminById({ id: _id }));
  }, [dispatch, _id]);

  useEffect(() => {
    if (subAdminByIdData?.data) {
      const { email, name, permissions, plainPassword, type } =
        subAdminByIdData.data;
      setState((prevState) => ({
        ...prevState,
        email: email,
        name: name,
        plainPassword: plainPassword || "", // Set plainPassword from data
        permission: permissions,
        type: type,
      }));
    }
  }, [subAdminByIdData]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };

  const validation = () => {
    let isValid = true;
    const { email, name, plainPassword, type } = state;

    if (!email) {
      handleError("email", "Please Enter User Name");
      isValid = false;
    }
    if (!name) {
      handleError("name", "Please Enter Name");
      isValid = false;
    }
    if (!plainPassword) {
      handleError("plainPassword", "Please Enter Password");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      const id = subAdminByIdData?.data?._id; // Get the ID from subAdminByIdData
      const data = {
        id,
        email: email,
        type: type,
        name,
        password: plainPassword,
        permissions: permission,
      }; // Include id in the payload
      dispatch(
        Actions.subadminUpdate({
          data,
          onAdd: () => navigate("/display-sub-admin"),
        })
      );
    }
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

  const { email, name, permission, plainPassword, type } = state;

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Edit SubAdmin Details</div>
              <div
                onClick={() => navigate("/display-sub-admin")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display SubAdmins</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6}>
            <TextField
              label="User Email"
              error={!!error.email}
              helperText={error.email}
              value={email}
              onFocus={() => handleError("email", null)}
              onChange={(e) => setState({ ...state, email: e.target.value })}
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              label="Name"
              error={!!error.name}
              helperText={error.name}
              value={name}
              onFocus={() => handleError("name", null)}
              onChange={(e) => setState({ ...state, name: e.target.value })}
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              label="Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={plainPassword} // Use plainPassword here
              onChange={(e) => setState({ ...state, plainPassword: e.target.value })} // Update plainPassword
              variant="outlined"
              error={!!error.plainPassword}
              helperText={error.plainPassword}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="type-select-label">Type</InputLabel>
              <Select
                labelId="type-select-label"
                id="type-select"
                label="Type"
                value={type || ""} // Ensure value is a string
                error={!!error.type}
                onFocus={() => handleError("type", null)}
                onChange={(e) => {
                  setState((prevState) => ({
                    ...prevState,
                    type: e.target.value, // Update type in state
                  }));
                }}
              >
                <MenuItem value="">
                  <em>-Select Type-</em>
                </MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="subadmin">Sub-Admin</MenuItem>
              </Select>
              {error.type && <FormHelperText error>{error.type}</FormHelperText>}
            </FormControl>
          </Grid>


          <Grid item lg={12}>
            <FormControl component="fieldset" style={{ marginLeft: "10px" }}>
              <FormLabel
                component="legend"
                style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
              >
                Permissions
              </FormLabel>
              <FormGroup aria-label="position" row>
                <div className={classes.chips}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permission?.astrologer?.isPermited}
                        onChange={() => {
                          if (permission?.astrologer?.isPermited) {
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
                            updatePermission("permission.astrologer.isPermited", true);
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
                        Astrologer
                      </span>
                    }
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={!permission?.astrologer?.isPermited}
                        checked={permission?.astrologer?.addAstrologer}
                        onChange={() => {
                          if (permission?.astrologer?.addAstrologer) {
                            updatePermission("permission.astrologer.addAstrologer", false);
                          } else {
                            updatePermission("permission.astrologer.addAstrologer", true);
                          }
                        }}
                      />
                    }
                    label={"Add Astrologer"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={!permission?.astrologer?.isPermited}
                        checked={permission?.astrologer?.listOfAstrologer?.isPermited}
                        onChange={() => {
                          if (permission?.astrologer?.listOfAstrologer?.isPermited) {
                            updatePermission("permission.astrologer.listOfAstrologer", {
                              isPermited: false,
                              updateStatus: false,
                              updateChatStatus: false,
                              updateCallStatus: false,
                              editAstrologer: false,
                              viewAstrologer: false,
                              deleteAstrologer: false,
                            });
                          } else {
                            updatePermission("permission.astrologer.listOfAstrologer.isPermited", true);
                          }
                        }}
                      />
                    }
                    label={"List of Astrologers"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              <FormGroup aria-label="position" row style={{ marginLeft: "30px" }}>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={
                          !permission?.astrologer?.isPermited ||
                          !permission?.astrologer?.listOfAstrologer?.isPermited
                        }
                        checked={permission?.astrologer?.listOfAstrologer?.updateStatus}
                        onChange={() => {
                          if (permission?.astrologer?.listOfAstrologer?.updateStatus) {
                            updatePermission("permission.astrologer.listOfAstrologer.updateStatus", false);
                          } else {
                            updatePermission("permission.astrologer.listOfAstrologer.updateStatus", true);
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
                    control={
                      <Checkbox
                        disabled={
                          !permission?.astrologer?.isPermited ||
                          !permission?.astrologer?.listOfAstrologer?.isPermited
                        }
                        checked={permission?.astrologer?.listOfAstrologer?.updateChatStatus}
                        onChange={() => {
                          if (permission?.astrologer?.listOfAstrologer?.updateChatStatus) {
                            updatePermission("permission.astrologer.listOfAstrologer.updateChatStatus", false);
                          } else {
                            updatePermission("permission.astrologer.listOfAstrologer.updateChatStatus", true);
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
                    control={
                      <Checkbox
                        disabled={
                          !permission?.astrologer?.isPermited ||
                          !permission?.astrologer?.listOfAstrologer?.isPermited
                        }
                        checked={permission?.astrologer?.listOfAstrologer?.updateCallStatus}
                        onChange={() => {
                          if (permission?.astrologer?.listOfAstrologer?.updateCallStatus) {
                            updatePermission("permission.astrologer.listOfAstrologer.updateCallStatus", false);
                          } else {
                            updatePermission("permission.astrologer.listOfAstrologer.updateCallStatus", true);
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
                    control={
                      <Checkbox
                        disabled={
                          !permission?.astrologer?.isPermited ||
                          !permission?.astrologer?.listOfAstrologer?.isPermited
                        }
                        checked={permission?.astrologer?.listOfAstrologer?.editAstrologer}
                        onChange={() => {
                          if (permission?.astrologer?.listOfAstrologer?.editAstrologer) {
                            updatePermission("permission.astrologer.listOfAstrologer.editAstrologer", false);
                          } else {
                            updatePermission("permission.astrologer.listOfAstrologer.editAstrologer", true);
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
                    control={
                      <Checkbox
                        disabled={
                          !permission?.astrologer?.isPermited ||
                          !permission?.astrologer?.listOfAstrologer?.isPermited
                        }
                        checked={permission?.astrologer?.listOfAstrologer?.viewAstrologer}
                        onChange={() => {
                          if (permission?.astrologer?.listOfAstrologer?.viewAstrologer) {
                            updatePermission("permission.astrologer.listOfAstrologer.viewAstrologer", false);
                          } else {
                            updatePermission("permission.astrologer.listOfAstrologer.viewAstrologer", true);
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
                    control={
                      <Checkbox
                        disabled={
                          !permission?.astrologer?.isPermited ||
                          !permission?.astrologer?.listOfAstrologer?.isPermited
                        }
                        checked={permission?.astrologer?.listOfAstrologer?.deleteAstrologer}
                        onChange={() => {
                          if (permission?.astrologer?.listOfAstrologer?.deleteAstrologer) {
                            updatePermission("permission.astrologer.listOfAstrologer.deleteAstrologer", false);
                          } else {
                            updatePermission("permission.astrologer.listOfAstrologer.deleteAstrologer", true);
                          }
                        }}
                      />
                    }
                    label={"Delete Astrologer"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              {/* Customer Section */}

              <FormGroup aria-label="position" row>
                <div className={classes.chips}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permission?.customer?.isPermited}
                        onChange={() => {
                          if (permission?.customer?.isPermited) {
                            updatePermission("permission.customer", {
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
                            });
                          } else {
                            updatePermission("permission.customer.isPermited", true);
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
                        Customer
                      </span>
                    }
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={!permission?.customer?.isPermited}
                        checked={permission?.customer?.addCustomer}
                        onChange={() => {
                          if (permission?.customer?.addCustomer) {
                            updatePermission("permission.customer.addCustomer", false);
                          } else {
                            updatePermission("permission.customer.addCustomer", true);
                          }
                        }}
                      />
                    }
                    label={"Add Customer"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={!permission?.customer?.isPermited}
                        checked={permission?.customer?.listOfCustomer?.isPermited}
                        onChange={() => {
                          if (permission?.customer?.listOfCustomer?.isPermited) {
                            updatePermission("permission.customer.listOfCustomer", {
                              isPermited: false,
                              updateCustomerStatus: false,
                              addRecharge: false,
                              editCustomer: false,
                              viewCustomer: false,
                              deleteCustomer: false,
                            });
                          } else {
                            updatePermission("permission.customer.listOfCustomer.isPermited", true);
                          }
                        }}
                      />
                    }
                    label={"List of Customer"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              <FormGroup aria-label="position" row style={{ marginLeft: "30px" }}>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={
                          !permission?.customer?.isPermited ||
                          !permission?.customer?.listOfCustomer?.isPermited
                        }
                        checked={permission?.customer?.listOfCustomer?.updateCustomerStatus}
                        onChange={() => {
                          if (permission?.customer?.listOfCustomer?.updateCustomerStatus) {
                            updatePermission("permission.customer.listOfCustomer.updateCustomerStatus", false);
                          } else {
                            updatePermission("permission.customer.listOfCustomer.updateCustomerStatus", true);
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
                    control={
                      <Checkbox
                        disabled={
                          !permission?.customer?.isPermited ||
                          !permission?.customer?.listOfCustomer?.isPermited
                        }
                        checked={permission?.customer?.listOfCustomer?.addRecharge}
                        onChange={() => {
                          if (permission?.customer?.listOfCustomer?.addRecharge) {
                            updatePermission("permission.customer.listOfCustomer.addRecharge", false);
                          } else {
                            updatePermission("permission.customer.listOfCustomer.addRecharge", true);
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
                    control={
                      <Checkbox
                        disabled={
                          !permission?.customer?.isPermited ||
                          !permission?.customer?.listOfCustomer?.isPermited
                        }
                        checked={permission?.customer?.listOfCustomer?.editCustomer}
                        onChange={() => {
                          if (permission?.customer?.listOfCustomer?.editCustomer) {
                            updatePermission("permission.customer.listOfCustomer.editCustomer", false);
                          } else {
                            updatePermission("permission.customer.listOfCustomer.editCustomer", true);
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
                    control={
                      <Checkbox
                        disabled={
                          !permission?.customer?.isPermited ||
                          !permission?.customer?.listOfCustomer?.isPermited
                        }
                        checked={permission?.customer?.listOfCustomer?.viewCustomer}
                        onChange={() => {
                          if (permission?.customer?.listOfCustomer?.viewCustomer) {
                            updatePermission("permission.customer.listOfCustomer.viewCustomer", false);
                          } else {
                            updatePermission("permission.customer.listOfCustomer.viewCustomer", true);
                          }
                        }}
                      />
                    }
                    label={"View customer"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={
                          !permission?.customer?.isPermited ||
                          !permission?.customer?.listOfCustomer?.isPermited
                        }
                        checked={permission?.customer?.listOfCustomer?.deleteCustomer}
                        onChange={() => {
                          if (permission?.customer?.listOfCustomer?.deleteCustomer) {
                            updatePermission("permission.customer.listOfCustomer.deleteCustomer", false);
                          } else {
                            updatePermission("permission.customer.listOfCustomer.deleteCustomer", true);
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

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={!permission?.customer?.isPermited}
                        checked={permission?.customer?.chatHistory?.isPermited}
                        onChange={() => {
                          if (permission?.customer?.chatHistory?.isPermited) {
                            updatePermission("permission.customer.chatHistory", {
                              isPermited: false,
                              viewChatMessages: false,
                              viewChatHistoryData: false,
                              delete: false,
                              addReview: false,
                              download: false,
                            });
                          } else {
                            updatePermission("permission.customer.chatHistory.isPermited", true);
                          }
                        }}
                      />
                    }
                    label={"Chat History"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              <FormGroup aria-label="position" row style={{ marginLeft: "30px" }}>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={
                          !permission?.customer?.isPermited ||
                          !permission?.customer?.chatHistory?.isPermited
                        }
                        checked={permission?.customer?.chatHistory?.viewChatMessages}
                        onChange={() => {
                          if (permission?.customer?.chatHistory?.viewChatMessages) {
                            updatePermission("permission.customer.chatHistory.viewChatMessages", false);
                          } else {
                            updatePermission("permission.customer.chatHistory.viewChatMessages", true);
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
                    control={
                      <Checkbox
                        disabled={
                          !permission?.customer?.isPermited ||
                          !permission?.customer?.chatHistory?.isPermited
                        }
                        checked={permission?.customer?.chatHistory?.viewChatHistoryData}
                        onChange={() => {
                          if (permission?.customer?.chatHistory?.viewChatHistoryData) {
                            updatePermission("permission.customer.chatHistory.viewChatHistoryData", false);
                          } else {
                            updatePermission("permission.customer.chatHistory.viewChatHistoryData", true);
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
                    control={
                      <Checkbox
                        disabled={
                          !permission?.customer?.isPermited ||
                          !permission?.customer?.chatHistory?.isPermited
                        }
                        checked={permission?.customer?.chatHistory?.delete}
                        onChange={() => {
                          if (permission?.customer?.chatHistory?.delete) {
                            updatePermission("permission.customer.chatHistory.delete", false);
                          } else {
                            updatePermission("permission.customer.chatHistory.delete", true);
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
                    control={
                      <Checkbox
                        disabled={
                          !permission?.customer?.isPermited ||
                          !permission?.customer?.chatHistory?.isPermited
                        }
                        checked={permission?.customer?.chatHistory?.addReview}
                        onChange={() => {
                          if (permission?.customer?.chatHistory?.addReview) {
                            updatePermission("permission.customer.chatHistory.addReview", false);
                          } else {
                            updatePermission("permission.customer.chatHistory.addReview", true);
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
                    control={
                      <Checkbox
                        disabled={
                          !permission?.customer?.isPermited ||
                          !permission?.customer?.chatHistory?.isPermited
                        }
                        checked={permission?.customer?.chatHistory?.download}
                        onChange={() => {
                          if (permission?.customer?.chatHistory?.download) {
                            updatePermission("permission.customer.chatHistory.download", false);
                          } else {
                            updatePermission("permission.customer.chatHistory.download", true);
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

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={!permission?.customer?.isPermited}
                        checked={permission?.customer?.callHistory?.isPermited}
                        onChange={() => {
                          if (permission?.customer?.callHistory?.isPermited) {
                            updatePermission("permission.customer.callHistory", {
                              isPermited: false,
                              viewChatHistoryData: false,
                              delete: false,
                              addReview: false,
                              download: false,
                            });
                          } else {
                            updatePermission("permission.customer.callHistory.isPermited", true);
                          }
                        }}
                      />
                    }
                    label={"Call History"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              <FormGroup aria-label="position" row style={{ marginLeft: "30px" }}>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={
                          !permission?.customer?.isPermited ||
                          !permission?.customer?.callHistory?.isPermited
                        }
                        checked={permission?.customer?.callHistory?.viewCallHistoryData}
                        onChange={() => {
                          if (permission?.customer?.callHistory?.viewCallHistoryData) {
                            updatePermission("permission.customer.callHistory.viewCallHistoryData", false);
                          } else {
                            updatePermission("permission.customer.callHistory.viewCallHistoryData", true);
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
                    control={
                      <Checkbox
                        disabled={
                          !permission?.customer?.isPermited ||
                          !permission?.customer?.callHistory?.isPermited
                        }
                        checked={permission?.customer?.callHistory?.delete}
                        onChange={() => {
                          if (permission?.customer?.callHistory?.delete) {
                            updatePermission("permission.customer.callHistory.delete", false);
                          } else {
                            updatePermission("permission.customer.callHistory.delete", true);
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
                    control={
                      <Checkbox
                        disabled={
                          !permission?.customer?.isPermited ||
                          !permission?.customer?.callHistory?.isPermited
                        }
                        checked={permission?.customer?.callHistory?.addReview}
                        onChange={() => {
                          if (permission?.customer?.callHistory?.addReview) {
                            updatePermission("permission.customer.callHistory.addReview", false);
                          } else {
                            updatePermission("permission.customer.callHistory.addReview", true);
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
                    control={
                      <Checkbox
                        disabled={
                          !permission?.customer?.isPermited ||
                          !permission?.customer?.callHistory?.isPermited
                        }
                        checked={permission?.customer?.callHistory?.download}
                        onChange={() => {
                          if (permission?.customer?.callHistory?.download) {
                            updatePermission("permission.customer.callHistory.download", false);
                          } else {
                            updatePermission("permission.customer.callHistory.download", true);
                          }
                        }}
                      />
                    }
                    label={"Download CSV"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              {/* Recharge History */}

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={!permission?.customer?.isPermited}
                        checked={permission?.customer?.rechargeHistory?.isPermited}
                        onChange={() => {
                          if (permission?.customer?.rechargeHistory?.isPermited) {
                            updatePermission("permission.customer.rechargeHistory", {
                                isPermited: false,
                                addRecharge: false,
                                delete: false,
                            });
                          } else {
                            updatePermission("permission.customer.rechargeHistory.isPermited", true);
                          }
                        }}
                      />
                    }
                    label={"Recharge History"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              <FormGroup aria-label="position" row style={{ marginLeft: "30px" }}>
               
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={
                          !permission?.customer?.isPermited ||
                          !permission?.customer?.rechargeHistory?.isPermited
                        }
                        checked={permission?.customer?.rechargeHistory?.addRecharge}
                        onChange={() => {
                          if (permission?.customer?.rechargeHistory?.addRecharge) {
                            updatePermission("permission.customer.rechargeHistory.addRecharge", false);
                          } else {
                            updatePermission("permission.customer.rechargeHistory.addRecharge", true);
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
                    control={
                      <Checkbox
                        disabled={
                          !permission?.customer?.isPermited ||
                          !permission?.customer?.rechargeHistory?.isPermited
                        }
                        checked={permission?.customer?.rechargeHistory?.delete}
                        onChange={() => {
                          if (permission?.customer?.rechargeHistory?.delete) {
                            updatePermission("permission.customer.rechargeHistory.delete", false);
                          } else {
                            updatePermission("permission.customer.rechargeHistory.delete", true);
                          }
                        }}
                      />
                    }
                    label={"Delete"}
                    labelPlacement="end"
                  />
                </div>

              </FormGroup>

              {/* Wallet History */}

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={!permission?.customer?.isPermited}
                        checked={permission?.customer?.walletHistory?.isPermited}
                        onChange={() => {
                          if (permission?.customer?.walletHistory?.isPermited) {
                            updatePermission("permission.customer.walletHistory", {
                                isPermited: false,
                            });
                          } else {
                            updatePermission("permission.customer.walletHistory.isPermited", true);
                          }
                        }}
                      />
                    }
                    label={"Wallet History"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

             {/* Call Discussion*/}

              <FormGroup aria-label="position" row>
                <div className={classes.chips}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={permission?.callDiscussion?.isPermited}
                        onChange={() => {
                          if (permission?.callDiscussion?.isPermited) {
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
                            updatePermission("permission.callDiscussion.isPermited", true);
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

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={!permission?.callDiscussion?.isPermited}
                        checked={permission?.callDiscussion?.viewCallDiscussion?.isPermited}
                        onChange={() => {
                          if (permission?.callDiscussion?.viewCallDiscussion?.isPermited) {
                            updatePermission("permission.callDiscussion.viewCallDiscussion", {
                              isPermited: false,
                                edit: false,
                                delete: false,
                                add: false,
                            });
                          } else {
                            updatePermission("permission.callDiscussion.viewCallDiscussion.isPermited", true);
                          }
                        }}
                      />
                    }
                    label={"View Call Discussion"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              <FormGroup aria-label="position" row style={{ marginLeft: "30px" }}>
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={
                          !permission?.callDiscussion?.isPermited ||
                          !permission?.callDiscussion?.viewCallDiscussion?.isPermited
                        }
                        checked={permission?.callDiscussion?.viewCallDiscussion?.edit}
                        onChange={() => {
                          if (permission?.callDiscussion?.viewCallDiscussion?.edit) {
                            updatePermission("permission.callDiscussion.viewCallDiscussion.edit", false);
                          } else {
                            updatePermission("permission.callDiscussion.viewCallDiscussion.edit", true);
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
                    control={
                      <Checkbox
                        disabled={
                          !permission?.callDiscussion?.isPermited ||
                          !permission?.callDiscussion?.viewCallDiscussion?.isPermited
                        }
                        checked={permission?.callDiscussion?.viewCallDiscussion?.delete}
                        onChange={() => {
                          if (permission?.callDiscussion?.viewCallDiscussion?.delete) {
                            updatePermission("permission.callDiscussion.viewCallDiscussion.delete", false);
                          } else {
                            updatePermission("permission.callDiscussion.viewCallDiscussion.delete", true);
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
                    control={
                      <Checkbox
                        disabled={
                          !permission?.callDiscussion?.isPermited ||
                          !permission?.callDiscussion?.viewCallDiscussion?.isPermited
                        }
                        checked={permission?.callDiscussion?.viewCallDiscussion?.add}
                        onChange={() => {
                          if (permission?.callDiscussion?.viewCallDiscussion?.add) {
                            updatePermission("permission.callDiscussion.viewCallDiscussion.add", false);
                          } else {
                            updatePermission("permission.callDiscussion.viewCallDiscussion.add", true);
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
          </Grid>


          <Grid item lg={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              {isLoading ? <CircularProgress size={24} /> : "Submit"}
            </div>
          </Grid>
          <Grid item lg={6}>
            <div
              onClick={() => setState({ ...state, plainPassword: "" })}
              className={classes.denyButton}
            >
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
  subAdminByIdData: state.admin.subAdminByIdData,
});

export default connect(mapStateToProps)(EditSubAdmin);
