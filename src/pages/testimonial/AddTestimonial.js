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
import * as Actions from "../../redux/Actions/testimonialActions.js";

const AddTestimonial = ({ dispatch }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [error, setError] = useState({ name: ""});
  const [description, setDescriptionText] = useState("");
  const [status, setStatus] = useState("");
  const [icon, setIcon] = useState({ file: '', bytes: null });
  const [file, setFile] = useState(null);
  const [rating, setRating] = useState(null);


  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };
  const handleOptionChange = (e) => {
    setStatus(e.target.value);
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
    if (!name) {
      handleError("name", "Please input name");
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
      formData.append("name", name);
      formData.append("description", description);
      formData.append("status", status);
      formData.append("image", file);
      formData.append("rating", rating);

      dispatch(
        Actions.addTestimonial(formData)
      );
      handleReset();
      navigate('/displayTestimonial')
    }
  };

  const handleReset = useCallback(() => {
    setname("");
    setDescriptionText("");
    setError({ name: "" });
    setStatus("")
    setIcon({ file: "", bytes: null });
    setFile(null);
    setRating('');
  });

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Testimonial</div>
              <div
                onClick={() => navigate("/displayTestimonial")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Testimonial</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Enter name"
              error={error.name ? true : false}
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
                <div className={classes.errorstyles}>{error.status}</div>
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
            error={error.rating ? true : false}
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

export default connect(null, mapDispatchToProps)(AddTestimonial);
