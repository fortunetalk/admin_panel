import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  CircularProgress
} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {addScheduleClass} from "../../redux/Actions/scheduleLiveClassActions.js";
import { useParams } from "react-router-dom";

const AddClass = ({ dispatch, isLoading }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { liveClassId } = useParams();

  const [formData, setFormData] = useState([
    {
      className: "",
      error: {},
      status: "",
      description: "",
      date: "",
      time: "",
      sessionTime: "",
      googleMeet: "",

    },
  ]);

  const handleError = (index, input, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index].error[input] = value;
    setFormData(updatedFormData);
  };

  const handleInputChange = (index, field, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index][field] = value;
    handleError(index, field, null); 
    setFormData(updatedFormData);
  };
  





  const validation = (index) => {
    const form = formData[index];
    let isValid = true;
    const errors = {};

    if (!form.className) {
      errors.className = "Please Input Class Name";
      isValid = false;
    }
    if (!form.status) {
      errors.status = "Please Select Status";
      isValid = false;
    }
    if (!form.date) {
      errors.date = "Please Input Date";
      isValid = false;
    }
   
    if (!form.time) {
      errors.time = "Please Input Time";
      isValid = false;
    }
    if (!form.sessionTime) {
      errors.sessionTime = "Please Input Session Time";
      isValid = false;
    }
    if (!form.googleMeet) {
      errors.googleMeet = "Please Input Google Meet URL";
      isValid = false;
    }
   
    if (!form.description) {
      errors.description = "This field is required";
      isValid = false;
    }

    if (!isValid) {
      handleError(index, "error", errors);
    }

    return isValid;
  };

  const handleSubmit = async () => {
    const classNames = [];
    const descriptions = [];
    const dates = [];
    const times = [];
    const sessionTimes = [];
    const googleMeets = [];
    const statuses = [];

    formData.forEach((form, index) => {
      if (validation(index)) {
        classNames.push(form.className);
        descriptions.push(form.description);
        dates.push(form.date);
        times.push(form.time);
        sessionTimes.push(form.sessionTime);
        googleMeets.push(form.googleMeet);
        statuses.push(form.status);
      }
    });

    const data = {
      liveClassId: liveClassId,
      classNames,
      descriptions,
      dates,
      times,
      sessionTimes,
      googleMeets,
      statuses,
    };

    dispatch(addScheduleClass(data));

    handleReset();
  };

  const handleReset = () => {
    setFormData([
      {
        className: "",
        error: {},
        status: "",
        description: "",
        date: "",
        time: "",
        sessionTime: "",
        googleMeet: "",
      
      },
    ]);
  };

  const addNewForm = () => {
    setFormData([
      ...formData,
      {
        className: "",
        error: {},
        status: "",
        description: "",
        date: "",
        time: "",
        sessionTime: "",
        googleMeet: "",
     
      },
    ]);
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {formData.map((form, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item lg={12} sm={12} md={12} xs={12}>
              <div className={classes.headingContainer}>
                <div className={classes.heading}>Add Class</div>
                
              </div>
            </Grid>

            <Grid item lg={6} sm={6} md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Select Status</InputLabel>
                <Select
                  labelId="select-label"
                  value={form.status}
                  onChange={(e) =>
                    handleInputChange(index, "status", e.target.value)
                  }
                  variant="outlined"
                  error={!!form.error.status}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
                </Select>
                <div className={classes.errorstyles}>{form.error.status}</div>
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextField
                label="Class Name"
                error={form.error.className ? true : false}
                helperText={form.error.className}
                value={form.className}
                onChange={(event) =>
                  handleInputChange(index, "className", event.target.value)
                }
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item lg={6} sm={12} md={6} xs={12}>
              <TextField
                type="date"
                value={form.date}
                variant="outlined"
                fullWidth
                onChange={(event) =>
                  handleInputChange(index, "date", event.target.value)
                }
                helperText={form.error.date}
                error={form.error.date ? true : false}
              />
            </Grid>

            <Grid item lg={6} sm={12} md={6} xs={12}>
              <TextField
                type="time"
                label="Time"
                value={form.time}
                variant="outlined"
                fullWidth
                onChange={(event) =>
                  handleInputChange(index, "time", event.target.value)
                }
                helperText={form.error.time}
                error={form.error.time ? true : false}
              />
            </Grid>
            <Grid item lg={6} sm={12} md={6} xs={12}>
              <TextField
                type="text"
                label="Session Time"
                value={form.sessionTime}
                variant="outlined"
                fullWidth
                onChange={(event) =>
                  handleInputChange(index, "sessionTime", event.target.value)
                }
                helperText={form.error.sessionTime}
                error={form.error.sessionTime ? true : false}
              />
            </Grid>
            <Grid item lg={6} sm={12} md={6} xs={12}>
              <TextField
                type="text"
                label="Google Meet URL"
                value={form.googleMeet}
                variant="outlined"
                fullWidth
                onChange={(event) =>
                  handleInputChange(index, "googleMeet", event.target.value)
                }
                helperText={form.error.googleMeet}
                error={form.error.googleMeet ? true : false}
              />
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={form.description}
                multiline
                rows={4}
                onChange={(event) =>
                  handleInputChange(index, "description", event.target.value)
                }
                helperText={form.error.description}
                error={form.error.description ? true : false}
              />
            </Grid>

           
          </Grid>
        ))}

        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <IconButton onClick={addNewForm} className={classes.addButton}>
              <AddCircleOutlineIcon />
              <div className={classes.addButtontext}>Add Another Class</div>
            </IconButton>
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
  isLoading: state.notification.isLoading,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddClass);
