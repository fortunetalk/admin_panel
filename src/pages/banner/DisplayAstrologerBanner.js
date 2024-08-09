import React, { useCallback, useEffect, useState } from "react";
import { propStyles, useStyles } from "../../assets/styles.js";
import {
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Colors } from "../../assets/styles.js";
import { AddCircleRounded } from "@mui/icons-material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { connect } from "react-redux";
import * as Actions from "../../redux/Actions/astrologerBannerActions.js";

const DisplayAstrologerBanner = ({ dispatch, astrologerBannerData }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [bannerId, setBannerId] = useState("");
  const [error, setError] = useState({});
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [icon, setIcon] = useState({ file: "", bytes: null });

  useEffect(function () {
    dispatch(Actions.getAstrologerBannerData());
  }, []);

  // Open modal with specific row data
  const handleOpen = (rowData) => {
    setOpen(true);
    setBannerId(rowData._id);
    setStatus(rowData.status);
    setIcon({ file: rowData.image, bytes: rowData.image });
  };

  // Handle errors for form fields
  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };

  // Handle status change
  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("bannerId", bannerId);
    formData.append("status", status);
    formData.append("image", file);

    dispatch(Actions.updateAstrologerBanner(formData));
    setOpen(false);
  };

  // Close modal
  const handleClose = useCallback(() => {
    setBannerId("");
    setOpen(false);
  }, []);

  // Confirm status change
  const handleClickOpen = (rowData) => {
    Swal.fire({
      title: "Are you sure to Change the Status?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus = rowData.status === "Active" ? "InActive" : "Active";
        dispatch(
          Actions.updateAstrologerBannerStatus({
            bannerId: rowData._id,
            status: newStatus,
          })
        );
      }
    });
  };

  // Handle icon file input change
  const handleIcon = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIcon({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      setFile(e.target.files[0]);
      handleError("icon", null);
    }
  };

  // Render table with data
  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Astrologer Banner"
            data={
              Array.isArray(astrologerBannerData) ? astrologerBannerData : []
            }
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) =>
                  Array.isArray(astrologerBannerData)
                    ? astrologerBannerData.indexOf(rowData) + 1
                    : "N/A",
              },
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
                title: "Status",
                field: "status",
                render: (rowData) => (
                  <div
                    className={classes.statusButton}
                    style={{
                      backgroundColor:
                        rowData.status === "Active" ? "#90EE90" : "#FF7F7F",
                    }}
                    onClick={() => handleClickOpen(rowData)}
                  >
                    {rowData.status}
                  </div>
                ),
              },
            ]}
            options={propStyles.tableStyles}
            style={{ fontSize: "1.4rem" }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Banner",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Banner",
                onClick: (event, rowData) =>
                  dispatch(
                    Actions.deleteAstrologerBanner({ bannerId: rowData._id })
                  ),
              },
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add Astrologer Banner",
                isFreeAction: true,
                onClick: () => navigate("/addAstrologerBanner"),
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }

  // Render modal for editing
  function editModal() {
    return (
      <div>
        <Dialog open={open}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item lg={12} sm={12} md={12} xs={12}>
                <div className={classes.headingContainer}>
                  <div className={classes.heading}>Edit Banner</div>
                  <div onClick={handleClose} className={classes.closeButton}>
                    <CloseRounded />
                  </div>
                </div>
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
              <Grid
                item
                lg={4}
                sm={6}
                md={4}
                xs={6}
                className={classes.uploadContainer}
              >
                <Grid component="label" className={classes.uploadImageButton}>
                  Upload Image
                  <input
                    onChange={handleIcon}
                    hidden
                    accept="image/*"
                    type="file"
                  />
                </Grid>
                <div className={classes.errorstyles}>{error.icon}</div>
              </Grid>
              <Grid item lg={2} sm={6} md={2} xs={6}>
                <Avatar
                  color={Colors.primaryDark}
                  src={icon.file}
                  style={{ width: 56, height: 56 }}
                />
              </Grid>
              <Grid item lg={6} sm={6} md={6} xs={6}>
                <div onClick={handleSubmit} className={classes.submitbutton}>
                  Submit
                </div>
              </Grid>
              <Grid item lg={6} sm={6} md={6} xs={6}>
                <div onClick={handleClose} className={classes.denyButton}>
                  Cancel
                </div>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {!astrologerBannerData ? (
        <CircularProgress />
      ) : (
        <div className={classes.box}>
          {astrologerBannerData && displayTable()}
          {editModal()}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  astrologerBannerData: state.astrologerBanner.astrologerBannerData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayAstrologerBanner);
