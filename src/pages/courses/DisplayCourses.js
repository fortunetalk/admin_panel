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
import {
  get_course,
  delete_course,
  update_course,
  base_url,
} from "../../utils/Constants.js";
import { deleteData, getData } from "../../utils/FetchNodeServices.js";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { connect } from "react-redux";
import * as Actions from "../../redux/Actions/courseActions.js";

const DisplayCourses = ({ dispatch, courseData, adminData}) => {
  const { user, type } = adminData || {};
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [courseId, setcourseId] = useState("");
  const [course, setcourse] = useState("");
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [learnEarn, setLearnEarn] = useState('')
  const [icon, setIcon] = useState({ file: logo_icon, bytes: null });
  const [file, setFile] = useState(null);

  useEffect(function () {
    dispatch(Actions.getCourseData());
  }, []);

  const handleOpen = (rowData) => {

    if (type === "subadmin" && !user.permissions.courses?.coursesList?.edit) {
      alert('You do not have permission to edit.');
      return;
    }

    setOpen(true);
    setcourseId(rowData._id);
    setcourse(rowData?.title);
    setDescription(rowData?.description);
    setLearnEarn(rowData?.learnEarn);
    setStatus(rowData?.status);
    setIcon({ file: rowData.image, bytes: rowData.image });
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
    if (!course) {
      handleError("course", "Please input course");
      isValid = false;
    }

    if (!description) {
      handleError("description", "Please input Description");
      isValid = false;
    }
    if (!file) {
      handleError("icon", "Please upload an image");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("status", status);
      formData.append("title", course);
      formData.append("description", description);
      formData.append("image", file);
      formData.append("learnEarn", learnEarn);
      formData.append("courseId", courseId);

      dispatch(
        Actions.updateCourse(formData)
      );
    setOpen(false);

    }
  };

  const handleClose = useCallback(() => {
    setcourseId("");
    setcourse("");
    setDescription("");
    setIcon({ file: logo_icon, bytes: null });
    setFile(null);
    setOpen(false);
  });

  const handleClickOpen = (rowData) => {
    if (type === "subadmin" && !user.permissions.courses?.coursesList?.status) {
      alert('You do not have permission to change status.');
      return;
    }

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
        dispatch(Actions.updateCourseStatus({ courseId: rowData._id, status: newStatus }));
      }
    });
  };

  return (
    <div className={classes.container}>
      {
        !courseData ? <CircularProgress/> :
        <div className={classes.box}>
        {displayTable()}
        {editModal()}
      </div>
      }
    </div>
  );
  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Courses"
            data={courseData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: rowData => Array.isArray(courseData) ? courseData.indexOf(rowData) + 1 : 'N/A'
              },
              { title: "Course", field: "title" },
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
                tooltip: "Edit course",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Course",
                onClick: (event, rowData) => {
                  if (
                    type === "subadmin" &&
                    !user.permissions.courses?.coursesList?.delete
                  ) {
                    alert('You do not have permission to delete.');
                    return; 
                  }
                  dispatch( Actions.deleteCourse({  courseId: rowData?._id,   title: rowData?.title, }) );
                },
              },
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add Course",
                isFreeAction: true,
                onClick: (event, rowData) => {
                  if (
                    type === "subadmin" &&
                    !user.permissions.courses?.coursesList?.add
                  ) {
                    alert('You do not have permission to add.');
                    return;
                  }
                  navigate("/AddCourse")
                },
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
              <div className={classes.heading}>Edit Course</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Enter Course"
              error={error.course ? true : false}
              helperText={error.course}
              value={course}
              onFocus={() => handleError("course", null)}
              onChange={(event) => setcourse(event.target.value)}
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
            lg={8}
            sm={8}
            md={8}
            xs={8}
            className={classes.uploadContainer}
          >
            <label className={classes.uploadImageButton}>
              Upload Image
              <input
                onChange={handleIcon}
                hidden
                accept="image/*"
                type="file"
              />
            </label>
            <div className={classes.errorstyles}>{error.icon}</div>
          </Grid>
          <Grid item lg={4} sm={4} md={4} xs={4}>
            <Avatar src={icon.file} style={{ width: 56, height: 56 }} />
          </Grid>
          <Grid item lg={12} sm={6} md={6} xs={6}>
            <TextField
              id="outlined-description-static"
              label="Learn & Earn"
              multiline
              rows={2}
              fullWidth
              value={learnEarn}
              onChange={(event) => setLearnEarn(event.target.value)}
              variant="outlined"
              error={error.learnEarn ? true : false}
              helperText={error.learnEarn}
            />
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
  courseData: state.course.courseData,
  adminData: state.admin.adminData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCourses);
