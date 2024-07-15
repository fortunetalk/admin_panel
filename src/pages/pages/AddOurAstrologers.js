import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import { Grid, TextField } from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";

export const AddOurAstrologers = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [shortBio, setShortBio] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [nameError, setNameError] = useState("");
  const [designationError, setDesignationError] = useState("");
  const [shortBioError, setShortBioError] = useState("");
  const [profilePhotoError, setProfilePhotoError] = useState("");

  const handleSubmission = () => {
    // Validate all fields
    let isValid = true;

    if (!name) {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!designation) {
      setDesignationError("Designation is required");
      isValid = false;
    } else {
      setDesignationError("");
    }

    if (!shortBio) {
      setShortBioError("About is required");
      isValid = false;
    } else {
      setShortBioError("");
    }

    if (!profilePhoto) {
      setProfilePhotoError("Profile photo is required");
      isValid = false;
    } else {
      setProfilePhotoError("");
    }

    if (isValid) {
      // Perform your submission logic
      // e.g., send data to the server
      console.log("Form submitted successfully!");
    }
  };

  const handleReset = () => {
    // Reset all form fields and errors
    setName("");
    setDesignation("");
    setShortBio("");
    setProfilePhoto(null);

    setNameError("");
    setDesignationError("");
    setShortBioError("");
    setProfilePhotoError("");
  };

  const handleFileChange = (e) => {
    // Validate file type and size if needed
    const file = e.target.files[0];

    if (!file) {
      setProfilePhotoError("Profile photo is required");
    } else if (!file.type.startsWith("image/")) {
      setProfilePhotoError("Please upload a valid image file");
    } else if (file.size > 1024 * 1024) {
      setProfilePhotoError("File size must be less than 1MB");
    } else {
      setProfilePhotoError("");
      setProfilePhoto(file);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          {/* ... Other components ... */}
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Our Astrologers</div>
              <div
                onClick={() => navigate("/displayOurAstrologers")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>
                  Display/AddTestMonials
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <label> Uplode Profile image</label>
            <TextField style={{width:'100%'}}
           
         
           accept="image/*" type="file" onChange={handleFileChange}
           />
            <div className={classes.errorstyles}>{profilePhotoError}</div>
            
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <label>Astrologer Name</label>
            <TextField
              label="Enter Name"
              value={name}
              variant="outlined"
              fullWidth
              onChange={(e) => setName(e.target.value)}
              error={!!nameError}
              helperText={nameError}
            />
          </Grid>

          <Grid item lg={6} sm={12} md={12} xs={12}>
            <label>Designation</label>
            <TextField
              label="Enter Designation"
              value={designation}
              variant="outlined"
              fullWidth
              onChange={(e) => setDesignation(e.target.value)}
              error={!!designationError}
              helperText={designationError}
            />
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              label="About"
              value={shortBio}
              variant="outlined"
              fullWidth
              onChange={(e) => setShortBio(e.target.value)}
              error={!!shortBioError}
              helperText={shortBioError}
            />
          </Grid>

         

          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleSubmission} className={classes.submitbutton}>
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

export default AddOurAstrologers;