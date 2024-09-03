import React, { useCallback, useState } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Colors } from "../../assets/styles.js";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import * as Actions from "../../redux/Actions/courseActions.js";

const AddCourses = ({ dispatch }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [course, setcourse] = useState("");
  const [error, setError] = useState({ course: ""});
  const [description, setDescriptionText] = useState("");
  const [status, setStatus] = useState("");
  const [learnEarn, setLearnEarn] = useState('');
  const [icon, setIcon] = useState({ file: '', bytes: null });
  const [file, setFile] = useState(null);


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
      formData.append("title", course);
      formData.append("description", description);
      formData.append("status", status);
      formData.append("image", file);
      formData.append("learnEarn", learnEarn);

      dispatch(
        Actions.addCourse(formData)
      );
      handleReset();
      navigate('/displayCourses')
    }
  };

  const handleReset = useCallback(() => {
    setcourse("");
    setDescriptionText("");
    setError({ course: "" });
    setStatus("")
  });

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Course</div>
              <div
                onClick={() => navigate("/displayCourses")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Courses</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Enter course"
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
              onChange={(event) => setDescriptionText(event.target.value)}
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
            <div onClick={handleReset} className={classes.denyButton}>
              Reset
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(null, mapDispatchToProps)(AddCourses);
