import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import { Grid, Select, MenuItem } from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const AddEnquiry = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [selectedStatus, setSelectedStatus] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!selectedStatus.trim()) { 
      errors.status = "Status is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    const isValid = validateForm();

    if (isValid) {
      // Your submit logic here
      console.log("Form is valid. Ready to submit.");
    }
  };

  const handleReset = () => {
    setSelectedStatus("");
    setValidationErrors({});
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Astrologer Inquiry List</div>
              <div
                onClick={() => navigate("/displayEnquiry")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>
                  Display/AddEnquiry
                </div>
              </div>
            </div> 
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <label>Status</label>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select</InputLabel>
              <Select
                label="Select Option"
                labelId="select-label"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                variant="outlined"
                error={Boolean(validationErrors.status)}
              >
                <MenuItem value="option1">option1</MenuItem>
                <MenuItem value="option2">option2</MenuItem>
                <MenuItem value="option3">option3</MenuItem>
              </Select>
              <div className={classes.errorstyles}>{validationErrors.status}</div>
            </FormControl>
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

export default AddEnquiry;