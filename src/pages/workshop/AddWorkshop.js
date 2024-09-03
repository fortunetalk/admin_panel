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
import logo_icon from "../../assets/images/logo_icon.png";
import { connect } from "react-redux";
import * as WorkshopActions from "../../redux/Actions/workshopActions.js";
import * as CourseActions from "../../redux/Actions/courseActions.js";
import * as AstrologerActions from "../../redux/Actions/astrologerActions.js";
import Loader from "../../Components/loading/Loader.js";

const AddWorkshop = ({ dispatch, activeAstrologerData, activeCourseData, isLoading }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [courseId, setcourseId] = useState("");
  const [astrologerId, setAstrologerId] = useState("");
  const [workShopName, setworkShopName] = useState("");
  const [error, setError] = useState({});
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [learn, setLearn] = useState("");
  const [courseContent, setCourseContent] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sessionTime, setSessionTime] = useState("");
  const [googleMeet, setGoogleMeet] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [icon, setIcon] = useState({ file: "", bytes: null });
  const [file, setFile] = useState(null);
  const [video, setVideo] = useState({ file: '', bytes: null });
  const [pdf, setPdf] = useState({ file: '', bytes: null });

  useEffect(function () {
    dispatch(CourseActions.getActiveCourseData());
    dispatch(AstrologerActions.getAllActiveAstrologer());
  }, []);


  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
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

  const handleVideo = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedVideo = e.target.files[0];
      setVideo({
        file: selectedVideo.name,
        bytes: selectedVideo,
      });
      handleError('video', null);
    }
  };

  const handlePdf = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedPdf = e.target.files[0];
      setPdf({
        file: selectedPdf.name,
        bytes: selectedPdf,
      });
      handleError('pdf', null);
    }
  };

  const validation = () => {
    var isValid = true;
    if (!courseId) {
      handleError("courseId", "Please Select Course");
      isValid = false;
    }
    if (!astrologerId) {
      handleError("astrologerId", "Please Select Astrologer");
      isValid = false;
    }
    if (!workShopName) {
      handleError("workShopName", "Please Input Workshop Name");
      isValid = false;
    }
    if (!status) {
      handleError("status", "Please Select Status");
      isValid = false;
    }
    if (!date) {
      handleError("date", "Please Input Date");
      isValid = false;
    }
    if (!file) {
      handleError("icon", "Please upload an image");
      isValid = false;
    }
    if (!time) {
      handleError("time", "Please Input Time");
      isValid = false;
    }
    if (!sessionTime) {
      handleError("sessionTime", "Please Input Session Time");
      isValid = false;
    }
    if (!googleMeet) {
      handleError("googleMeet", "Please Input Google Meet URL");
      isValid = false;
    }
    if (!video.file) {
      handleError("video", "Video is required");
      isValid = false;
    }
    if (!learn) {
      handleError("learn", "This field is required");
      isValid = false;
    }
    if (!courseContent) {
      handleError("courseContent", "This field is required");
      isValid = false;
    }
    if (!description) {
      handleError("description", "This field is required");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("astrologerId", astrologerId);
      formData.append("courseId", courseId);
      formData.append("workShopName", workShopName);
      formData.append("description", description);
      formData.append("status", status);
      formData.append("learn", learn);
      formData.append("courseContent", courseContent);
      formData.append("date", date);
      formData.append("time", time);
      formData.append("sessionTime", sessionTime);
      formData.append("googleMeet", googleMeet);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("image", file);
      formData.append("video", video.bytes, video.file);
      formData.append("pdf", pdf.bytes, pdf.file);

      dispatch(WorkshopActions.addWorkshop(formData));
      handleReset();
    }
  };

  const handleReset = () => {
    setDescription("");
    setStatus("");
    setAstrologerId("");
    setworkShopName("");
    setLearn("");
    setCourseContent("");
    setDate("");
    setTime("");
    setSessionTime("");
    setGoogleMeet("");
    setPrice("");
    setDiscount("");
    setIcon({ file: "", bytes: null });
    setFile(null);
    setError({});
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Workshop</div>
              <div
                onClick={() => navigate("/displayWorkshop")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Workshop</div>
              </div>
            </div>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Course
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Course"
                value={courseId}
                onFocus={() => handleError("courseId", null)}
                onChange={(e) => setcourseId(e.target.value)}
                error={error.courseId ? true : false}
              >
                <MenuItem disabled value={null}>
                  -Select Course-
                </MenuItem>
                {activeCourseData && fillCourseList()}
              </Select>
            </FormControl>
            <div className={classes.errorstyles}>{error.courseId}</div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Astrologer
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Astrologer"
                value={astrologerId}
                onFocus={() => handleError("astrologerId", null)}
                onChange={(e) => setAstrologerId(e.target.value)}
                error={error.astrologerId ? true : false}
              >
                <MenuItem disabled value={null}>
                  -Select Astrologer-
                </MenuItem>
                {activeAstrologerData && fillAstrologerList()}
              </Select>
            </FormControl>
            <div className={classes.errorstyles}>{error.astrologerId}</div>
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
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Workshop Name"
              error={error.workShopName ? true : false}
              helperText={error.workShopName}
              value={workShopName}
              onFocus={() => handleError("workShopName", null)}
              onChange={(event) => setworkShopName(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item lg={6} sm={12} md={6} xs={12}>
            <TextField
              type="date"
              value={date}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("date", null)}
              onChange={(event) => setDate(event.target.value)}
              helperText={error.date}
              error={error.date ? true : false}
            />
          </Grid>

          <Grid item lg={6} sm={12} md={6} xs={12}>
            <TextField
              type="time"
              label="Time"
              value={time}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("time", null)}
              onChange={(event) => setTime(event.target.value)}
              helperText={error.time}
              error={error.time ? true : false}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={6} xs={12}>
            <TextField
              type="text"
              label="Session Time"
              value={sessionTime}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("sessionTime", null)}
              onChange={(event) => setSessionTime(event.target.value)}
              helperText={error.sessionTime}
              error={error.sessionTime ? true : false}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={6} xs={12}>
            <TextField
              type="text"
              label="Google Meet URL"
              value={googleMeet}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("googleMeet", null)}
              onChange={(event) => setGoogleMeet(event.target.value)}
              helperText={error.googleMeet}
              error={error.googleMeet ? true : false}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={6} xs={12}>
            <TextField
              type="number"
              label="Price"
              value={price}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("price", null)}
              onChange={(event) => setPrice(event.target.value)}
              helperText={error.price}
              error={error.price ? true : false}
            />
          </Grid>

          <Grid item lg={6} sm={12} md={6} xs={12}>
            <TextField
              type="number"
              label="Discount"
              value={discount}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("discount", null)}
              onChange={(event) => setDiscount(event.target.value)}
              helperText={error.discount}
              error={error.discount ? true : false}
            />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              fullWidth
              label="Learn"
              id="fullWidth"
              value={learn}
              multiline
              rows={4}
              onFocus={() => handleError("learn", null)}
              onChange={(event) => setLearn(event.target.value)}
              helperText={error.learn}
              error={error.learn ? true : false}
            />
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              fullWidth
              label="Description"
              id="fullWidth"
              value={description}
              multiline
              rows={4}
              onFocus={() => handleError("description", null)}
              onChange={(event) => setDescription(event.target.value)}
              helperText={error.description}
              error={error.description ? true : false}
            />
          </Grid>
          
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              fullWidth
              label="Course Content"
              id="fullWidth"
              value={courseContent}
              multiline
              rows={4}
              onFocus={() => handleError("courseContent", null)}
              onChange={(event) => setCourseContent(event.target.value)}
              helperText={error.courseContent}
              error={error.courseContent ? true : false}
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
              {
                icon.file ? 
                icon.file:
                'Upload Image'
              }
              <input
            onChange={handleIcon}
            hidden
            accept="image/*"
            type="file"
          />
        </label>
        <div className={classes.errorStyles}>{error.icon}</div>
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
              Upload Video
               <input
            onChange={handleVideo}
            hidden
            accept="video/*"
            type="file"
          />
            </label>
            <div className={classes.errorstyles}>{error.video}</div>
          </Grid>
          <Grid item lg={2} sm={6} md={2} xs={6}>
          {video.file && (
          <video
            src={video.file}
            style={{ width: 150 }}
            controls
          />
        )}
          </Grid>

          <Grid
        item
        lg={2}
        sm={6}
        md={2}
        xs={6}
        className={classes.uploadContainer}
      >
        <label className={classes.uploadImageButton}>
          {
            pdf.file ? pdf.file : 'Upload PDF'
          }
          <input
            onChange={handlePdf}
            hidden
            accept="application/pdf"
            type="file"
          />
        </label>
        <div className={classes.errorStyles}>{error.pdf}</div>
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

  function fillCourseList() {
    return activeCourseData.map((item) => {
      return <MenuItem value={item._id}>{item.title}</MenuItem>;
    });
  }
  function fillAstrologerList() {
    return activeAstrologerData.map((item) => {
      return <MenuItem value={item._id}>{item.displayName}</MenuItem>;
    });
  }
};

const mapStateToProps = (state) => ({
  activeCourseData: state.course.activeCourseData,
  activeAstrologerData: state.astrologer.activeAstrologerData,
  isLoading: state.workshop.isLoading,

});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddWorkshop);
