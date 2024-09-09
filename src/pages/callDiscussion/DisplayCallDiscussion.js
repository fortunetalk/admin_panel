import React, { useCallback, useEffect, useState } from "react";
import { propStyles, useStyles } from "../../assets/styles.js";
import {  Grid, TextField, FormControl, InputLabel, MenuItem, Select, Avatar, CircularProgress } from "@mui/material";
import { Colors } from "../../assets/styles.js";
import { AddCircleRounded } from "@mui/icons-material";
import logo_icon from "../../assets/images/logo_icon.png";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { connect } from "react-redux";
import * as Actions from "../../redux/Actions/callDiscussionAction.js";

const DisplayCallDiscussion = ({ dispatch, calllDiscussionData, isLoading }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [review, setReview] = useState("");
  const [description, setDescription] = useState("");
  const [userDiscussionId, setUserDiscussionId] = useState("");
  const [error, setError] = useState("");


  useEffect(function () {
    dispatch(Actions.getCallDiscussion());
  }, []);

  const handleOpen = (rowData) => {
    setOpen(true);
    setUserDiscussionId(rowData?._id);
    setAdminName(rowData?.admin_name);
    setUserName(rowData?.user_name);
    setPhone(rowData?.phone_number);
    setDescription(rowData?.discussion)
    setReview(rowData?.review);
  };


  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };

  const handleOptionChange = (e) => {
    setReview(e.target.value);
  };

  const validation = () => {
    var isValid = true;
    if (!adminName) {
      handleError("adminName", "Please input Admin Name");
      isValid = false;
    }

    if (!userName) {
      handleError("userName", "Please Select User Name");
      isValid = false;
    }
    if (!phone) {
      handleError("phone", "Please Input User Phone Number");
      isValid = false;
    }
    if (!review) {
      handleError("review", "Please Input Review");
      isValid = false;
    }
   
    if (!description) {
        handleError("description", "Please input Description");
        isValid = false;
      }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var body = {
        userDiscussionId: userDiscussionId,
        user_name: userName ,
        admin_name: adminName,
        phone_number: phone,
        review: review,
        discussion: description,
      };
      dispatch(Actions.updateCallDiscussion(body));
       setOpen(false);

    }
  };


  const handleClose = useCallback(() => {
    setAdminName("");
    setUserName("");
    setPhone("");
    setReview("");
    setDescription("");
    setOpen(false);
  });

 

  return (
    <div className={classes.container}>
      {!calllDiscussionData ? (
        <CircularProgress />
      ) : (
        <div className={classes.box}>
          {calllDiscussionData && displayTable()}
          {editModal()}
        </div>
      )}
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Call Discussions"
            data={calllDiscussionData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: rowData => Array.isArray(calllDiscussionData) ? calllDiscussionData.indexOf(rowData) + 1 : 'N/A'
              },
              { title: "Admin Name", field: "admin_name" },
              { title: "User Name", field: "user_name" },
              { title: "User Phone No.", field: "phone_number" },
              {title: "Discussion",field: "discussion",},
              {title: "Review",field: "review",},
            ]}
            options={propStyles.tableStyles}
            style={{ fontSize: "1.4rem" }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete",
                onClick: (event, rowData) =>
                  dispatch(
                    Actions.deleteCallDiscussion({
                      userDiscussionId: rowData?._id,
                    })
                  ),
              },
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add Gift",
                isFreeAction: true,
                onClick: () => navigate("/add-call-discussion"),
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }

  function editModal() {
    const showEditForm = () => {
      return (
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Edit Gift</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Admin Name"
              error={error.adminName ? true : false}
              helperText={error.adminName}
              value={adminName}
              onFocus={() => handleError("adminName", null)}
              onChange={(event) => setAdminName(event.target.value)}
              variant="outlined"
              fullWidth
            />
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
              label="User Phone no"
              error={error.phone ? true : false}
              helperText={error.phone}
              value={phone}
              onFocus={() => handleError("phone", null)}
              onChange={(event) => setPhone(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Select Review</InputLabel>
                <Select
                  labelId="select-label"
                  value={review}
                  onChange={handleOptionChange}
                  variant="outlined"
                  error={!!error.review}
                >
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="NotGood">Not Good</MenuItem>
                  <MenuItem value="Excelent">Excelent</MenuItem>
                </Select>
                <div className={classes.errorstyles}>{error.review}</div>
              </FormControl>
            </Grid>
          
          <Grid item lg={12} sm={6} md={6} xs={6}>
          <TextField
              id="outlined-description-static"
              label="Discussion"
              multiline
              rows={6}
              fullWidth
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              variant="outlined"
              error={error.description ? true : false}
              helperText={error.description}
            />
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={6}>
          <div onClick={handleSubmit} className={classes.submitbutton}>
              {isLoading ? <CircularProgress size={24} /> : "Submit"}
            </div>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleClose} className={classes.denyButton}>
              Cancel
            </div>
          </Grid>
        </Grid>
      );
    };

    return (
      <div>
        <Dialog open={open}>
          <DialogContent>{showEditForm()}</DialogContent>
        </Dialog>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  calllDiscussionData: state.callDiscussion.calllDiscussionData,
    isLoading: state.callDiscussion.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCallDiscussion);
