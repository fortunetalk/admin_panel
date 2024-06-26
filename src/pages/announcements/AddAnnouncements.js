import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import { Grid, TextField } from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";

export const AddAnnouncements = () => {
  var classes = useStyles();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [shortBio, setShortBio] = useState("");
  const [shortBioError, setShortBioError] = useState(""); // Fix: Declare shortBioError state
  const [Submit, setsubmit] = useState("");
  const [Reset, setreset] = useState("");

  const handleSubmit = () => {
    // Reset previous error
    setShortBioError("");

    // validation shortBio
    if (shortBio.trim() === "") {
      setShortBioError("ShortBio Name is required");
    }
    if (!shortBioError) {
      // Your form submission logic here
      console.log("Form submitted successfully!");
    } else {
      console.log("Form has errors. Please fix them.");
    }
  };

  const handleReset = () => {
    // Reset all form fields and errors
    setShortBio("");
    setShortBioError("");
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          {/* ... other components ... */}
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>All Announcements</div>
              <div
                onClick={() => navigate("/displayAnnouncements")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>
                  Display/Add Announcements
                </div>
              </div>
            </div>
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              label="Description"
              value={shortBio}
              onChange={(e) => setShortBio(e.target.value)}
              variant="outlined"
              fullWidth
              error={!!shortBioError}
              helperText={shortBioError}
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

export default AddAnnouncements;