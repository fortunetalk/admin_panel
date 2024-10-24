import React, { useEffect } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Grid,
  CircularProgress,
  InputAdornment,
  IconButton,
  TextField,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "../../redux/Actions/adminAction.js";
import { useState } from "react";

export const ViewSubAdmin = ({ dispatch, subAdminByIdData, isLoading }) => {
  const { _id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    dispatch(Actions.getSubAdminById({ id: _id }));
  }, [dispatch, _id]);

  if (isLoading) {
    return <CircularProgress />;
  }


  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const permissions = subAdminByIdData?.data?.permissions || {
    astrologer: {
      isPermited: false,
      addAstrologer: false,
      listOfAstrologer: {
        isPermited: false,
        updateStatus: false,
        updateChatStatus: false,
        updateCallStatus: false,
        markAsTop: false,
        editAstrologer: false,
        viewAstrologer: false,
        deleteAstrologer: false,
      },
      topAstrologers: {
        isPermited: false,
        delete: false,
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
      addCourses: false,
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
      mcqList: false,
      
    },
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>View SubAdmin Details</div>
              <div
                onClick={() => navigate("/display-sub-admin")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display SubAdmins</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <TextField
              label="User Name"
              value={subAdminByIdData?.data?.email || ""}
              variant="outlined"
              InputProps={{ readOnly: true }} // Make it read-only
              fullWidth
            />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <TextField
              label="Name"
              value={subAdminByIdData?.data?.name || ""}
              variant="outlined"
              InputProps={{ readOnly: true }} // Make it read-only
              fullWidth
            />
          </Grid>
          <Grid item lg={4} sm={6} md={6} xs={6}>
            <TextField
              id="outlined-description-static"
              label="Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={subAdminByIdData?.data?.plainPassword || ""}
              variant="outlined"
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


          {/* Permissions */}
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <FormControl component="fieldset" style={{ marginLeft: "10px" }}>
              <FormLabel
                component="legend"
                style={{ fontSize: "20px", fontWeight: "500", color: "black" }}
              >
                Permissions
              </FormLabel>

                {/* Astrologers  */}

              <FormGroup aria-label="position" row>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permissions?.astrologer?.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        checked={permissions?.astrologer?.isPermited}
                        disabled
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

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={"Add Astrologer"}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permissions?.astrologer?.isPermited}
                        checked={permissions?.astrologer?.addAstrologer}
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
                    value={permissions?.astrologer?.listOfAstrologer?.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permissions?.astrologer?.isPermited}
                        checked={permissions?.astrologer?.listOfAstrologer?.isPermited}
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
                    value={permissions?.astrologer?.listOfAstrologer?.updateStatus}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.astrologer?.isPermited ||
                          !permissions?.astrologer?.listOfAstrologer?.isPermited
                        }
                        checked={permissions?.astrologer?.listOfAstrologer?.updateStatus}
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
                          !permissions?.astrologer?.isPermited ||
                          !permissions?.astrologer?.listOfAstrologer?.isPermited
                        }
                        checked={permissions?.astrologer?.listOfAstrologer?.updateChatStatus}
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
                          !permissions?.astrologer?.isPermited ||
                          !permissions?.astrologer?.listOfAstrologer?.isPermited
                        }
                        checked={permissions?.astrologer?.listOfAstrologer?.updateCallStatus}
                      />
                    }
                    label={"Update Call Status"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={permissions?.astrologer?.listOfAstrologer?.markAsTop}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.astrologer?.isPermited ||
                          !permissions?.astrologer?.listOfAstrologer?.isPermited
                        }
                        checked={permissions?.astrologer?.listOfAstrologer?.markAsTop}
                      />
                    }
                    label={"Mark as top"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={permissions?.astrologer?.listOfAstrologer?.editAstrologer}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.astrologer?.isPermited ||
                          !permissions?.astrologer?.listOfAstrologer?.isPermited
                        }
                        checked={permissions?.astrologer?.listOfAstrologer?.editAstrologer}
                      />
                    }
                    label={"Edit Astrologer"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={permissions?.astrologer?.listOfAstrologer?.viewAstrologer}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.astrologer?.isPermited ||
                          !permissions?.astrologer?.listOfAstrologer?.isPermited
                        }
                        checked={permissions?.astrologer?.listOfAstrologer?.viewAstrologer}
                      />
                    }
                    label={"View Astrologer"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={permissions?.astrologer?.listOfAstrologer?.deleteAstrologer}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.astrologer?.isPermited ||
                          !permissions?.astrologer?.listOfAstrologer?.isPermited
                        }
                        checked={permissions?.astrologer?.listOfAstrologer?.deleteAstrologer}
                      />
                    }
                    label={"Delete Astrologer"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permissions?.astrologer?.topAstrologers?.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permissions?.astrologer?.isPermited}
                        checked={permissions?.astrologer?.topAstrologers?.isPermited}
                      />
                    }
                    label={"Top Astrologers"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              <FormGroup aria-label="position" row style={{ marginLeft: "30px" }}>
                <div>
                  <FormControlLabel
                    value={permissions?.astrologer?.topAstrologers?.delete}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.astrologer?.isPermited ||
                          !permissions?.astrologer?.topAstrologers?.isPermited
                        }
                        checked={permissions?.astrologer?.topAstrologers?.delete}
                      />
                    }
                    label={"Delete"}
                    labelPlacement="end"
                  />
                </div>
            
              </FormGroup>

              {/* Customer  */}

              <FormGroup aria-label="position" row>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permissions?.customer?.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        checked={permissions?.customer?.isPermited}
                        disabled
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

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={"Add Customer"}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permissions?.customer?.isPermited}
                        checked={permissions?.customer?.addCustomer}
                      />
                    }
                    label={"Add Customer"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              {/* List of Customer */}

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permissions?.customer?.listOfCustomer?.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permissions?.customer?.isPermited}
                        checked={permissions?.customer?.listOfCustomer?.isPermited}
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
                    value={permissions?.customer?.listOfCustomer?.updateCustomerStatus}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.customer?.isPermited ||
                          !permissions?.customer?.listOfCustomer?.isPermited
                        }
                        checked={permissions?.customer?.listOfCustomer?.updateCustomerStatus}
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
                          !permissions?.customer?.isPermited ||
                          !permissions?.customer?.listOfCustomer?.isPermited
                        }
                        checked={permissions?.customer?.listOfCustomer?.addRecharge}
                      />
                    }
                    label={"Add Recharge"}
                    labelPlacement="end"
                  />
                </div>
               
                <div>
                  <FormControlLabel
                    value={permissions?.customer?.listOfCustomer?.editCustomer}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.customer?.isPermited ||
                          !permissions?.customer?.listOfCustomer?.isPermited
                        }
                        checked={permissions?.customer?.listOfCustomer?.editCustomer}
                      />
                    }
                    label={"Edit Customer"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={permissions?.customer?.listOfCustomer?.viewCustomer}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.customer?.isPermited ||
                          !permissions?.customer?.listOfCustomer?.isPermited
                        }
                        checked={permissions?.customer?.listOfCustomer?.viewCustomer}
                      />
                    }
                    label={"View Customer"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={permissions?.customer?.listOfCustomer?.deleteCustomer}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.customer?.isPermited ||
                          !permissions?.customer?.listOfCustomer?.isPermited
                        }
                        checked={permissions?.customer?.listOfCustomer?.deleteCustomer}
                      />
                    }
                    label={"Delete Customer"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              {/* Chat History  */}

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permissions?.customer?.chatHistory?.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permissions?.customer?.isPermited}
                        checked={permissions?.customer?.chatHistory?.isPermited}
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
                    value={permissions?.customer?.chatHistory?.viewChatMessages}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.customer?.isPermited ||
                          !permissions?.customer?.chatHistory?.isPermited
                        }
                        checked={permissions?.customer?.chatHistory?.viewChatMessages}
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
                          !permissions?.customer?.isPermited ||
                          !permissions?.customer?.chatHistory?.isPermited
                        }
                        checked={permissions?.customer?.chatHistory?.viewChatHistoryData}
                      />
                    }
                    label={"View Chat History Data"}
                    labelPlacement="end"
                  />
                </div>
               
                <div>
                  <FormControlLabel
                    value={permissions?.customer?.chatHistory?.delete}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.customer?.isPermited ||
                          !permissions?.customer?.chatHistory?.isPermited
                        }
                        checked={permissions?.customer?.chatHistory?.delete}
                      />
                    }
                    label={"Delete"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={permissions?.customer?.chatHistory?.addReview}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.customer?.isPermited ||
                          !permissions?.customer?.chatHistory?.isPermited
                        }
                        checked={permissions?.customer?.chatHistory?.addReview}
                      />
                    }
                    label={"Add Review"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={permissions?.customer?.chatHistory?.download}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.customer?.isPermited ||
                          !permissions?.customer?.chatHistory?.isPermited
                        }
                        checked={permissions?.customer?.chatHistory?.download}
                      />
                    }
                    label={"Download CSV"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              {/* Call History  */}

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permissions?.customer?.callHistory?.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permissions?.customer?.isPermited}
                        checked={permissions?.customer?.callHistory?.isPermited}
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
                    value={"View Call History Data"}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.customer?.isPermited ||
                          !permissions?.customer?.callHistory?.isPermited
                        }
                        checked={permissions?.customer?.callHistory?.viewCallHistoryData}
                      />
                    }
                    label={"View Call History Data"}
                    labelPlacement="end"
                  />
                </div>
               
                <div>
                  <FormControlLabel
                    value={permissions?.customer?.callHistory?.delete}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.customer?.isPermited ||
                          !permissions?.customer?.callHistory?.isPermited
                        }
                        checked={permissions?.customer?.callHistory?.delete}
                      />
                    }
                    label={"Delete"}
                    labelPlacement="end"
                  />
                </div>

                <div>
                  <FormControlLabel
                    value={permissions?.customer?.callHistory?.addReview}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.customer?.isPermited ||
                          !permissions?.customer?.callHistory?.isPermited
                        }
                        checked={permissions?.customer?.callHistory?.addReview}
                      />
                    }
                    label={"Add Review"}
                    labelPlacement="end"
                  />
                </div>

                <div>
                  <FormControlLabel
                    value={permissions?.customer?.callHistory?.download}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.customer?.isPermited ||
                          !permissions?.customer?.callHistory?.isPermited
                        }
                        checked={permissions?.customer?.callHistory?.download}
                      />
                    }
                    label={"Download CSV"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              {/* Recharge History  */}

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permissions?.customer?.rechargeHistory?.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permissions?.customer?.isPermited}
                        checked={permissions?.customer?.rechargeHistory?.isPermited}
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
                    value={permissions?.customer?.rechargeHistory?.addRecharge}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.customer?.isPermited ||
                          !permissions?.customer?.rechargeHistory?.isPermited
                        }
                        checked={permissions?.customer?.rechargeHistory?.addRecharge}
                      />
                    }
                    label={"Add Recharge"}
                    labelPlacement="end"
                  />
                </div>

                <div>
                  <FormControlLabel
                    value={permissions?.customer?.rechargeHistory?.delete}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.customer?.isPermited ||
                          !permissions?.customer?.rechargeHistory?.isPermited
                        }
                        checked={permissions?.customer?.rechargeHistory?.delete}
                      />
                    }
                    label={"Delete"}
                    labelPlacement="end"
                  />
                </div>

              </FormGroup>

              {/* Wallet History  */}

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permissions?.customer?.walletHistory?.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permissions?.customer?.isPermited}
                        checked={permissions?.customer?.walletHistory?.isPermited}
                      />
                    }
                    label={"Wallet History"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

               {/* Call Discussion */}

              <FormGroup aria-label="position" row>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permissions?.callDiscussion?.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        checked={permissions?.callDiscussion?.isPermited}
                        disabled
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
                    value={permissions?.callDiscussion?.viewCallDiscussion?.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permissions?.callDiscussion?.isPermited}
                        checked={permissions?.callDiscussion?.viewCallDiscussion?.isPermited}
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
                    value={permissions?.callDiscussion?.viewCallDiscussion?.edit}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.callDiscussion?.isPermited ||
                          !permissions?.callDiscussion?.viewCallDiscussion?.isPermited
                        }
                        checked={permissions?.callDiscussion?.viewCallDiscussion?.edit}
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
                          !permissions?.callDiscussion?.isPermited ||
                          !permissions?.callDiscussion?.viewCallDiscussion?.isPermited
                        }
                        checked={permissions?.callDiscussion?.viewCallDiscussion?.delete}
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
                          !permissions?.callDiscussion?.isPermited ||
                          !permissions?.callDiscussion?.viewCallDiscussion?.isPermited
                        }
                        checked={permissions?.callDiscussion?.viewCallDiscussion?.add}
                      />
                    }
                    label={"Add"}
                    labelPlacement="end"
                  />
                </div>

              </FormGroup>

               {/* Courses List */}

              <FormGroup aria-label="position" row>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permissions?.courses?.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        checked={permissions?.courses?.isPermited}
                        disabled
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
                        Courses
                      </span>
                    }
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permissions?.courses?.coursesList?.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permissions?.courses?.isPermited}
                        checked={permissions?.courses?.coursesList?.isPermited}
                      />
                    }
                    label={"Courses List"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              <FormGroup aria-label="position" row style={{ marginLeft: "30px" }}>

                <div>
                  <FormControlLabel
                    value={permissions?.courses?.coursesList?.status}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.coursesList?.isPermited
                        }
                        checked={permissions?.courses?.coursesList?.status}
                      />
                    }
                    label={"Status"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={permissions?.courses?.coursesList?.edit}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.coursesList?.isPermited
                        }
                        checked={permissions?.courses?.coursesList?.edit}
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
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.coursesList?.isPermited
                        }
                        checked={permissions?.courses?.coursesList?.delete}
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
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.coursesList?.isPermited
                        }
                        checked={permissions?.courses?.coursesList?.add}
                      />
                    }
                    label={"Add"}
                    labelPlacement="end"
                  />
                </div>

              </FormGroup>

             {/* Add Courses */}

             <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={"Add Courses"}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permissions?.courses?.isPermited}
                        checked={permissions?.courses?.addCourses}
                      />
                    }
                    label={"Add Courses"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>


               {/* Demo Class */}

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permissions?.courses?.demoClass?.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permissions?.courses?.isPermited}
                        checked={permissions?.courses?.demoClass?.isPermited}
                      />
                    }
                    label={"Demo Class"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              <FormGroup aria-label="position" row style={{ marginLeft: "30px" }}>

                <div>
                  <FormControlLabel
                    value={permissions?.courses?.demoClass?.adminStatus}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.demoClass?.isPermited
                        }
                        checked={permissions?.courses?.demoClass?.adminStatus}
                      />
                    }
                    label={"Admin Status"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={permissions?.courses?.demoClass?.classStatus}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.demoClass?.isPermited
                        }
                        checked={permissions?.courses?.demoClass?.classStatus}
                      />
                    }
                    label={"Class Status"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={permissions?.courses?.demoClass?.status}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.demoClass?.isPermited
                        }
                        checked={permissions?.courses?.demoClass?.status}
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
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.demoClass?.isPermited
                        }
                        checked={permissions?.courses?.demoClass?.pdf}
                      />
                    }
                    label={"PDF"}
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
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.demoClass?.isPermited
                        }
                        checked={permissions?.courses?.demoClass?.view}
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
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.demoClass?.isPermited
                        }
                        checked={permissions?.courses?.demoClass?.edit}
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
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.demoClass?.isPermited
                        }
                        checked={permissions?.courses?.demoClass?.delete}
                      />
                    }
                    label={"Delete"}
                    labelPlacement="end"
                  />
                </div>

              </FormGroup>

               {/* Live Class */}

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={permissions?.courses?.liveClass?.isPermited}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permissions?.courses?.isPermited}
                        checked={permissions?.courses?.liveClass?.isPermited}
                      />
                    }
                    label={"Live Class"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>

              <FormGroup aria-label="position" row style={{ marginLeft: "30px" }}>

                <div>
                  <FormControlLabel
                    value={permissions?.courses?.liveClass?.adminStatus}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.liveClass?.isPermited
                        }
                        checked={permissions?.courses?.liveClass?.adminStatus}
                      />
                    }
                    label={"Admin Status"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={permissions?.courses?.liveClass?.classStatus}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.liveClass?.isPermited
                        }
                        checked={permissions?.courses?.liveClass?.classStatus}
                      />
                    }
                    label={"Class Status"}
                    labelPlacement="end"
                  />
                </div>
                <div>
                  <FormControlLabel
                    value={permissions?.courses?.liveClass?.status}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.liveClass?.isPermited
                        }
                        checked={permissions?.courses?.liveClass?.status}
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
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.liveClass?.isPermited
                        }
                        checked={permissions?.courses?.liveClass?.pdf}
                      />
                    }
                    label={"PDF"}
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
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.liveClass?.isPermited
                        }
                        checked={permissions?.courses?.liveClass?.view}
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
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.liveClass?.isPermited
                        }
                        checked={permissions?.courses?.liveClass?.edit}
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
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.liveClass?.isPermited
                        }
                        checked={permissions?.courses?.liveClass?.delete}
                      />
                    }
                    label={"Delete"}
                    labelPlacement="end"
                  />
                </div>

                <div>
                  <FormControlLabel
                    value={"Class List"}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.liveClass?.isPermited
                        }
                        checked={permissions?.courses?.liveClass?.classList}
                      />
                    }
                    label={"Class List"}
                    labelPlacement="end"
                  />
                </div>

                <div>
                  <FormControlLabel
                    value={"MCQ Questions"}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.liveClass?.isPermited
                        }
                        checked={permissions?.courses?.liveClass?.mcqQuestions}
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
                          !permissions?.courses?.isPermited ||
                          !permissions?.courses?.liveClass?.isPermited
                        }
                        checked={permissions?.courses?.liveClass?.add}
                      />
                    }
                    label={"Add"}
                    labelPlacement="end"
                  />
                </div>

              </FormGroup>

              {/* MCQ Questions */}

              <FormGroup aria-label="position" row style={{ marginLeft: "10px", marginRight: "10px" }}>
                <div className={classes.chips}>
                  <FormControlLabel
                    value={"MCQ Questions"}
                    className={classes.checkbox}
                    control={
                      <Checkbox
                        disabled={!permissions?.courses?.isPermited}
                        checked={permissions?.courses?.mcqList}
                      />
                    }
                    label={"MCQ Questions"}
                    labelPlacement="end"
                  />
                </div>
              </FormGroup>


            </FormControl>
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

export default connect(mapStateToProps)(ViewSubAdmin);
