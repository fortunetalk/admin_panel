import React, { useCallback, useEffect, useState } from "react";
import { propStyles, useStyles } from "../../assets/styles.js";
import {  Grid, TextField, FormControl, InputLabel, MenuItem, Select, Avatar } from "@mui/material";
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
import * as Actions from "../../redux/Actions/testimonialActions.js";

const DisplayTestimonial = ({ dispatch, testimonialData }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [testimonialId, settestimonialId] = useState("");
  const [name, setname] = useState("");
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState({ file: logo_icon, bytes: null });
  const [file, setFile] = useState(null);
  const [rating, setRating] = useState(null);



  useEffect(function () {
    dispatch(Actions.getTestimonial());
  }, []);

  const handleOpen = (rowData) => {
    setOpen(true);
    settestimonialId(rowData?._id);
    setname(rowData?.name);
    setRating(rowData?.rating);
    setDescription(rowData?.description);
    setStatus(rowData?.status);
    setIcon({ file: rowData?.image, bytes: null });
  };


  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };

  const handleRatingValueChange = (e) => {
    const newrating = e.target.value;
    if (isNaN(newrating) || newrating === "") {
      handleError("rating", "Please enter a valid number");
    } else {
      const parsedrating = parseFloat(newrating);
      if (parsedrating >= 0 && parsedrating <= 5) {
        handleError("rating", null);
        setRating(parsedrating)
      } else {
        handleError("rating", "rating must be between 0 and 5");
      }
    }
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
      setFile(e.target.files[0]);
    }
  };


  const handleSubmit = async () => {
      var formData = new FormData();
      formData.append("status", status);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", file);
      formData.append("rating", rating);
      formData.append("testimonialId", testimonialId);

      dispatch(
        Actions.updateTestimonial( formData)
      );
    setOpen(false);
  };

  const handleClose = useCallback(() => {
    settestimonialId("");
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
        dispatch(Actions.updateTestimonialStatus({ testimonialId: rowData._id, status: newStatus }));
      }
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {testimonialData && displayTable()}
        {editModal()}
      </div>
    </div>
  );
  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Testimonials"
            data={testimonialData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: rowData => Array.isArray(testimonialData) ? testimonialData.indexOf(rowData) + 1 : 'N/A'
              },
              { title: "Name", field: "name" },
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
              { title: "Rating", field: "rating" },
              // {
              //   title: "Description",
              //   field: "description",
              // },
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
                icon: "edit",
                tooltip: "Edit Testimonial",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Testimonial",
                onClick: (event, rowData) =>
                  dispatch(
                    Actions.deleteTestimonial({
                      testimonialId: rowData?._id,
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
                tooltip: "Add Testimonial",
                isFreeAction: true,
                onClick: () => navigate("/addTestimonial"),
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
              <div className={classes.heading}>Edit Testimonial</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Enter Name"
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
              </FormControl>
            </Grid>

            <Grid item lg={6} sm={12} md={6} xs={12}>
          <TextField
            type="number"
            label="Rating"
            value={rating}
            variant="outlined"
            fullWidth
            onFocus={() => handleError("rating", null)}
            onChange={handleRatingValueChange}
            helperText={error.rating}
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
              Change Image
              <input
                onChange={handleIcon}
                hidden
                accept="image/*"
                type="file"
              />
            </label>
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
              helperText={error.description}
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
  testimonialData: state.testimonial.testimonialData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTestimonial);
