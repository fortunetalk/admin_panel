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
} from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { Colors } from "../../assets/styles.js";
import DialogContent from "@mui/material/DialogContent";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import * as CourseBannerActions from "../../redux/Actions/courseBannerActions.js";
import * as CourseActions from "../../redux/Actions/courseActions.js";
import { connect } from "react-redux";

const DisplayCourseBanner = ({ dispatch, courseBannerData, courseData }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [courseBannerId, setcourseBannerId] = useState("");
  const [courseId, setcourseId] = useState("");
  const [error, setError] = useState({});
  const [status, setStatus] = useState("");
  const [file, setFile] = useState(null);
  const [icon, setIcon] = useState({ file: "", bytes: null });


  useEffect(function () {
    dispatch(CourseActions.getCourseData());
    dispatch(CourseBannerActions.getCourseBannerData());
  }, []);

  const handleOpen = (rowData) => {
    setOpen(true);
    setcourseBannerId(rowData._id);
    setStatus(rowData.status);
    // setcourseId(rowData._id)
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    var isValid = true;
    if (!courseId) {
      handleError("courseId", "Please Select Course");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("courseId", courseId);
      formData.append("bannerId", courseBannerId);
      formData.append("status", status);
      formData.append("image", file);

      dispatch(CourseBannerActions.updateCourseBanner(formData));
      handleClose();
    }
  };

  const handleClose = () => {
    setcourseId("");
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
        dispatch(CourseBannerActions.updateCourseBannerStatus({ bannerId: rowData._id, status: newStatus }));
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
      <div className={classes.box}>
        {courseBannerData && displayTable()}
        {editModal()}
      </div>
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Course Banners"
            data={courseBannerData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: rowData => Array.isArray(courseBannerData) ? courseBannerData.indexOf(rowData) + 1 : 'N/A'
              },
              { title: "Course Type", field: "redirectionUrl" },

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
                icon: "edit",
                tooltip: "Edit Course Banner",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Course Banner",
                onClick: (event, rowData) =>
                  dispatch(
                    CourseBannerActions.deleteCourseBanner({
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
                tooltip: "Add Skill",
                isFreeAction: true,
                onClick: () => navigate("/addCourseBanner"),
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }

  function editModal() {
    const fillSkillList = () => {
      return courseData.map((item) => {
        return <MenuItem value={item._id}>{item.title}</MenuItem>;
      });
    };
    const showEditForm = () => {
      return (
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Edit Course Banner</div>
            </div>
          </Grid>
         
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Course</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Skill"
                value={courseId}
                onFocus={() => handleError("courseId", null)}
                onChange={(e) => setcourseId(e.target.value)}
                error={error.courseId ? true : false}
              >
                <MenuItem disabled value={null}>
                  -Select Skill-
                </MenuItem>
                {courseData && fillSkillList()}
              </Select>
            </FormControl>
            <div className={classes.errorstyles}>{error.courseId}</div>
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
              Upload Picture
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
  courseBannerData: state.courseBanner.courseBannerData,
  courseData: state.course.courseData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCourseBanner);
