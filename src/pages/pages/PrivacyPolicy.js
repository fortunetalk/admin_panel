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
import * as Actions from "../../redux/Actions/privacyPolicyActions.js";
import TextEditor from "./TextEditor.js";

const PrivacyPolicy = ({ dispatch, privacyPolicyData, isLoading }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [viewData, setViewData] = useState(false);

  const [privacyId, setprivacyId] = useState("");
  const [page, setpage] = useState("");
  const [name, setname] = useState("");
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState({ file: logo_icon, bytes: null });
  const [file, setFile] = useState(null);


  useEffect(function () {
    dispatch(Actions.getAllPrivacyPolicyList());
  }, []);

  const handleOpen = (rowData) => {
    setOpen(true);
    setprivacyId(rowData?._id);
    setname(rowData?.title);
    setDescription(rowData?.description);
    setpage(rowData?.page)
    setStatus(rowData?.status);
  };

  const handleView = (rowData) => {
    setViewData(true);
    setname(rowData?.title)    
    setDescription(rowData?.description);
    setStatus(rowData?.status);
    setpage(rowData?.page)
    setIcon(rowData?.image);

  };


  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const handleIcon = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIcon({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      handleError("icon", null);
      setFile(e.target.files[0]);
    }
  };

  const validation = () => {
    var isValid = true;
    if (!name) {
      handleError("name", "Please input name");
      isValid = false;
    }

    if (!description) {
      handleError("description", "Please input Description");
      isValid = false;
    }
    if (!icon.file) {
      handleError("icon", "Please Select Image");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("status", status);
      formData.append("title", name);
      formData.append("description", description);
      formData.append("image", file);
      formData.append("privacyId", privacyId);
      formData.append("page", page);

      dispatch(
        Actions.updatePrivacyPolicy( formData)
      );
      if (isLoading) {
        setOpen(true);
      } else{
        setOpen(false);
      }

    }
  };

  const handleClose = useCallback(() => {
   setViewData(false);
   setOpen(false);
  });

  const handleClickOpen = (rowData) => {

    Swal.fire({
      title: 'Are you sure to Change the Status?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus = rowData.status === 'Active' ? 'InActive' : 'Active';
        dispatch(Actions.updatePrivacyPolicyStatus({ privacyId: rowData._id, status: newStatus }));
      }
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {privacyPolicyData && displayTable()}
        {editModal()}
        {viewModal()}
      </div>
    </div>
  );
  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Privacy Policy"
            data={privacyPolicyData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: rowData => Array.isArray(privacyPolicyData) ? privacyPolicyData.indexOf(rowData) + 1 : 'N/A'
              },
              { title: "Name", field: "title" },
              { title: "Page", field: "page" },
              {
                title: "Image",
                field: "image",
                render: (rowData) => (
                  <Avatar
                    src={rowData.image}
                    style={{ width: 50, height: 50 }}
                    variant="rounded"
                  />
                ),
              },
              { title: "Status", field: "status", render: rowData => (
                <div className={classes.statusButton}
                style={{ backgroundColor: rowData.status === 'Active' ? '#90EE90' : '#FF7F7F '}}
                onClick={() => handleClickOpen(rowData)}>
                  {rowData.status}
                </div>
              )},
            ]}
            options={propStyles.tableStyles}
            style={{ fontSize: "1.4rem" }}
            actions={[
              {
                icon: "visibility",
                tooltip: "View",
                onClick: (event, rowData) => handleView(rowData),
              },
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
                    Actions.deletePrivacyPolicy({
                      privacyId: rowData?._id,
                      title: rowData?.title,
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
                tooltip: "Add Privacy Policy",
                isFreeAction: true,
                onClick: () => navigate("/addPrivacyPolicy"),
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
              <div className={classes.heading}>Edit Privacy Policy</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Enter Title"
              error={error.name ? true : false}
              helperText={error.name}
              value={name}
              onFocus={() => handleError("name", null)}
              onChange={(event) => setname(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Select Status</InputLabel>
                <Select
                  labelId="select-label"
                  value={status}
                  onChange={handleOptionChange}
                  variant="outlined"
                  error={!!error.status}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
                </Select>
                <div className={classes.errorstyles}>{error.status}</div>
              </FormControl>
            </Grid>
            <Grid item lg={6} sm={12} md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select Page</InputLabel>
              <Select
                labelId="select-label"
                value={page}
                onChange={(e) => setpage(e.target.value)}
                variant="outlined"
                error={!!error.page}
              >
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="astrologer">Astrologer</MenuItem>
              </Select>
              <div className={classes.errorstyles}>{error.status}</div>
            </FormControl>
          </Grid>
            <Grid
            item
            lg={4}
            sm={6}
            md={6}
            xs={6}
            className={classes.uploadContainer}
          >
            <label className={classes.uploadImageButton}>
              Upload Picture
              <input
                onChange={handleIcon}
                hidden
                accept="image/*"
                type="file"
              />
            </label>
            <div className={classes.errorstyles}>{error.icon}</div>
          </Grid>
          <Grid item lg={2} sm={6} md={2} xs={6}>
            <Avatar src={icon.file} style={{ width: 56, height: 56 }} />
          </Grid>

<Grid item lg={12} sm={12} md={12} xs={12}>
            <TextEditor
              description={description}
              onDescriptionChange={setDescription}
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

  function viewModal() {
    const viewForm = () => {
      return (
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Privacy Policy Data</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
        
        
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Title"
              value={name}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

       
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Status"
              value={status}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Page"
              value={page}
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <label htmlFor="">Image</label>
            <Avatar
              src={icon}
              variant="square"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              fullWidth
              label="Description"
              id="fullWidth"
              value={description}
              multiline
              rows={6}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        
        
         
        </Grid>
      );
    };

    return (
      <div>
        <Dialog open={viewData}>
          <DialogContent>{viewForm()}</DialogContent>
        </Dialog>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  privacyPolicyData: state.privacyPolicy.privacyPolicyData,
    isLoading: state.privacyPolicy.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);
