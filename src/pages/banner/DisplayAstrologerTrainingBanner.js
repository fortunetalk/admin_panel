import React, { useEffect, useState } from "react";
import { propStyles, useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { Colors } from "../../assets/styles.js";
import DialogContent from "@mui/material/DialogContent";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import * as astrologerTrainingBannerActions from "../../redux/Actions/astrologerTrainingBannerActions.js";
import { connect } from "react-redux";

const DisplayAstrologerTrainingBanner = ({ dispatch, astrologerTrainingBannerData}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [courseBannerId, setcourseBannerId] = useState("");
  const [source, setsource] = useState("");
  const [error, setError] = useState({});
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [icon, setIcon] = useState({ file: "", bytes: null });


  useEffect(function () {
    dispatch(astrologerTrainingBannerActions.getAstrologerTrainingBannerData());
  }, []);

  const handleOpen = (rowData) => {
    setOpen(true);
    setcourseBannerId(rowData._id);
    setStatus(rowData.status);
    setsource(rowData.source)
    setIcon({ file: rowData.image, bytes: rowData.image });
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    var isValid = true;
    if (!source) {
      handleError("source", "Please Select Course");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("bannerId", courseBannerId);
      formData.append("source", source);
      formData.append("status", status);
      formData.append("image", file);

      dispatch(astrologerTrainingBannerActions.updateAstrologerTrainingBanner(formData));
      handleClose();
    }
  };

  const handleClose = () => {
    setsource("");
    setcourseBannerId("");
    setStatus('')
    setOpen(false);
  };

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
        dispatch(astrologerTrainingBannerActions.updateAstrologerTrainingBannerStatus({ bannerId: rowData._id, status: newStatus }));
      }
    });
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
    setError({ ...error, status: '' });
  };

  const handleIcon = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIcon({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      setFile(e.target.files[0]);
      handleError('icon', null);
    }
  };

  return (
    <div className={classes.container}>
      {!astrologerTrainingBannerData ? (
        <CircularProgress />
      ) : (
        <div className={classes.box}>
          {astrologerTrainingBannerData && displayTable()}
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
            title="Astrologer Training Banner"
            data={astrologerTrainingBannerData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: rowData => Array.isArray(astrologerTrainingBannerData) ? astrologerTrainingBannerData.indexOf(rowData) + 1 : 'N/A'
              },
              { title: "Source URL", field: "source" },

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
            style={{ fontSize: "1.0rem" }}
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
                    astrologerTrainingBannerActions.deleteAstrologerTrainingBanner({
                      bannerId: rowData?._id,
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
                tooltip: "Add Banner",
                isFreeAction: true,
                onClick: () => navigate("/addAstrologerTrainingBanner"),
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
              <div className={classes.heading}>Edit Astrologer Training Banner</div>
            </div>
          </Grid>
         
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Source URL"
              error={!!error.source}
              helperText={error.source}
              value={source}
              onFocus={() => handleError("source", null)}
              onChange={(event) => setsource(event.target.value)}
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
            <Grid
            item
            lg={6}
            sm={6}
            md={6}
            xs={6}
            className={classes.uploadContainer}
          >
            <Grid component="label" className={classes.uploadImageButton}>
              Change Image
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
  astrologerTrainingBannerData: state.astrologerTrainingBanner.astrologerTrainingBannerData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplayAstrologerTrainingBanner);
