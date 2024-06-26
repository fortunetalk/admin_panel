import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const AddAppversion = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [version, setVersion] = useState("");
  const [status, setStatus] = useState("");
  const [nameError, setNameError] = useState("");
  const [versionError, setVersionError] = useState("");
  const [statusError, setStatusError] = useState("");

  const handleSubmit = () => {
    // Reset previous errors
    setNameError("");
    setVersionError("");
    setStatusError("");

    // Validate name
    if (name.trim() === "") {
      setNameError("Version Name is required");
    }

    // Validate version
    if (version.trim() === "") {
      setVersionError("Version Code is required");
    }

    // Validate status
    if (status === "") {
      setStatusError("Status is required");
    }

    // Check if there are any errors
    if (!nameError && !versionError && !statusError) {
      // Your form submission logic here
      console.log("Form submitted successfully!");
    } else {
      console.log("Form has errors. Please fix them.");
    }
  };

  const handleReset = () => {
    // Reset all form fields and errors
    setName("");
    setVersion("");
    setStatus("");
    setNameError("");
    setVersionError("");
    setStatusError("");
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>App Version</div>
            
            </div>
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Version Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              fullWidth
              error={!!nameError}
              helperText={nameError}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Version Code"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              variant="outlined"
              fullWidth
              error={!!versionError}
              helperText={versionError}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Status</InputLabel>
              <Select
                label="Select Option"
                labelId="select-label"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                variant="outlined"
                error={!!statusError}
              >
                <MenuItem value="option1">Yes</MenuItem>
                <MenuItem value="option2">No</MenuItem>
              </Select>
              {statusError && (
                <div className={classes.error}>{statusError}</div>
              )}
            </FormControl>
          </Grid>
    
          <Grid item lg={6} sm={6} md={6} xs={6}>

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

export default AddAppversion;