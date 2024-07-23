import React, { useState, useEffect } from "react";
import { useStyles } from "../../assets/styles.js";
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
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../assets/styles.js";
import { connect } from "react-redux";
import * as Actions from "../../redux/Actions/astrologerTrainingBannerActions.js";
import Loader from "../../Components/loading/Loader.js";

const AddAstrologerTrainingBanner = ({ dispatch, isLoading }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [source, setSource] = useState("");
  const [error, setError] = useState({});
  const [status, setStatus] = useState("")
  const [file, setFile] = useState(null);
  const [icon, setIcon] = useState({ file: "", bytes: null });


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
      formData.append("source", source);
      formData.append("status", status);
      formData.append("image", file);

      dispatch(Actions.createAstrologerTrainingBanner(formData))
      handleReset();
      // navigate('/displayCourseBanner')
    }
  };

  const handleReset = () => {
    setStatus("");
    setIcon("");
    setSource("");
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
      handleError('icon', null);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Course Banner</div>
              <div
                onClick={() => navigate("/displayAstrologerTrainingBanner")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Banner Data</div>
              </div>
            </div>
          </Grid>
        
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Source URL"
              error={!!error.source}
              helperText={error.source}
              value={source}
              onFocus={() => handleError("source", null)}
              onChange={(event) => setSource(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={12}>
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
              {isLoading ? <CircularProgress size={24} /> : "Submit"}
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

const mapStateToProps = (state) => ({
  courseData: state.course.courseData,
  isLoading: state.astrologerTrainingBanner.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddAstrologerTrainingBanner);
