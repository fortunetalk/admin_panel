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
import * as Actions from "../../redux/Actions/giftActions.js";

const DisplayGift = ({ dispatch, giftData, isLoading }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [giftId, setgiftId] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setname] = useState("");
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState({ file: logo_icon, bytes: null });
  const [file, setFile] = useState(null);


  useEffect(function () {
    dispatch(Actions.getAllGifts());
  }, []);

  const handleOpen = (rowData) => {
    setOpen(true);
    setgiftId(rowData?._id);
    setname(rowData?.title);
    setDescription(rowData?.description);
    setAmount(rowData?.amount)
    setStatus(rowData?.status);
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
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("status", status);
      formData.append("title", name);
      formData.append("description", description);
      formData.append("image", file);
      formData.append("giftId", giftId);
      formData.append("amount", amount);

      dispatch(
        Actions.updateGift( formData)
      );
    setOpen(false);

    }
  };

  const handleClose = useCallback(() => {
    setgiftId("");
    setname("");
    setDescription("");
    setIcon({ file: logo_icon, bytes: null });
    setFile(null);
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
        dispatch(Actions.updateGiftStatus({ giftId: rowData._id, status: newStatus }));
      }
    });
  };

  return (
    <div className={classes.container}>
      {!giftData ? (
        <CircularProgress />
      ) : (
        <div className={classes.box}>
          {giftData && displayTable()}
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
            title="Gift's List"
            data={giftData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: rowData => Array.isArray(giftData) ? giftData.indexOf(rowData) + 1 : 'N/A'
              },
              { title: "Name", field: "title" },
              { title: "Amount", field: "amount" },
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

              {
                title: "Description",
                field: "description",
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
            style={{ fontSize: "1.0rem" }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Gift",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Gift",
                onClick: (event, rowData) =>
                  dispatch(
                    Actions.deleteGift({
                      giftId: rowData?._id,
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
                tooltip: "Add Gift",
                isFreeAction: true,
                onClick: () => navigate("/addGift"),
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
              label="Enter Name"
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

            <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Amount"
              error={error.amount ? true : false}
              helperText={error.amount}
              value={amount}
              onFocus={() => handleError("amount", null)}
              onChange={(event) => setAmount(event.target.value)}
              variant="outlined"
              fullWidth
            />
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
          <Grid item lg={12} sm={6} md={6} xs={6}>
            <TextField
              id="outlined-description-static"
              label="Description"
              multiline
              rows={4}
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
  giftData: state.gift.giftData,
    isLoading: state.gift.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplayGift);
