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
  CircularProgress
} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "../../redux/Actions/notificationActions.js";

const AddCustomerNotification = ({ dispatch, isLoading }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState({ name: "", description: "", customerType: "", icon: "" });
  const [description, setDescriptionText] = useState("");
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState({ file: '', bytes: null });
  const [file, setFile] = useState(null);
  const [customerType, setCustomerType] = useState("");

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
    let isValid = true;
    if (!name) {
      handleError("name", "Please input name");
      isValid = false;
    }
    if (!file) {
      handleError("icon", "Please upload an image");
      isValid = false;
    }
    if (!customerType) {
      handleError("customerType", "Please Select Customer Type");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      const formData = new FormData();
      formData.append("title", name);
      formData.append("description", description);
      formData.append("status", status);
      formData.append("image", file);
      formData.append("customerType", customerType);

      dispatch(Actions.sendCustomerNotification(formData));
    //   handleReset();
    }
  };

  const handleReset = useCallback(() => {
    setName("");
    setDescriptionText("");
    setError({ name: "", description: "", customerType: "", icon: "" });
    setStatus("");
    setIcon({ file: "", bytes: null });
    setFile(null);
    setCustomerType("");
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Customer Notification</div>
              <div onClick={() => navigate("/customerNotification")} className={classes.addButton}>
                <DvrIcon />
                <div className={classes.addButtontext}>Display Customer Notification</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Enter Title"
              error={!!error.name}
              helperText={error.name}
              value={name}
              onFocus={() => handleError("name", null)}
              onChange={(event) => setName(event.target.value)}
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
                <MenuItem value="Inactive">Inactive</MenuItem>
              </Select>
              <div className={classes.errorstyles}>{error.status}</div>
            </FormControl>
          </Grid>
          <Grid item lg={6} sm={12} md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-customerType-label">Select Customer Type</InputLabel>
              <Select
                labelId="select-customerType-label"
                value={customerType}
                onChange={(e) => setCustomerType(e.target.value)}
                variant="outlined"
                error={!!error.customerType}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="New">New</MenuItem>
                <MenuItem value="Old">Old</MenuItem>
              </Select>
              <div className={classes.errorstyles}>{error.customerType}</div>
            </FormControl>
          </Grid>
          <Grid item lg={4} sm={6} md={6} xs={6} className={classes.uploadContainer}>
            <label className={classes.uploadImageButton}>
              Upload Image
              <input onChange={handleIcon} hidden accept="image/*" type="file" />
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
              onChange={(event) => setDescriptionText(event.target.value)}
              variant="outlined"
              error={!!error.description}
              helperText={error.description}
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
    isLoading: state.notification.isLoading,
  });
  
  const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomerNotification);
