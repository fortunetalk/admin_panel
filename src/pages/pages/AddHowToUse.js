import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import { Grid } from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";

export const AddHowToUse = () => {
  var classes = useStyles();
  const navigate = useNavigate();

  const [error, setError] = useState({
    profilePhoto: "",
  });

  const [Submit, setSubmit] = useState("");
  const [Reset, setReset] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError({ profilePhoto: "Please select a profile image." });
    } else if (!file.type.startsWith("image/")) {
      setError({ profilePhoto: "Please upload a valid image file." });
    } else if (file.size > 5242880) { // 5 MB in bytes
      setError({ profilePhoto: "File size exceeds 5 MB. Please choose a smaller image." });
    } else {
      setError({ profilePhoto: "" });
      // Perform any additional checks or actions if needed
    }
  };

  const handleSubmit = () => {
   
    navigate("");
  };

  const handleReset = () => {
    // Reset the state or perform any other necessary actions
    setError({ profilePhoto: "" });
    setSubmit(""); // Reset other state variables if needed
    setReset("");
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>How to Use ScreenShots</div>
              <div
                onClick={() => navigate("/displayHowToUse")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display/AddScreenshot</div>
              </div>
            </div>
          </Grid>

          <Grid
            item
            lg={4}
            sm={3}
            md={3}
            xs={3}
            className={classes.uploadContainer}
          >
            <Grid
              component="label"
              className={classes.uploadImageButton}
            >
              Upload Profile
              <input
                onChange={handleImageUpload}
                hidden
                accept="image/*"
                type="file"
              />
            </Grid>
            <div className={classes.errorstyles}>{error.profilePhoto}</div>
          </Grid>

          <Grid item lg={4} sm={6} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              Submit
            </div>
          </Grid>
          <Grid item lg={4} sm={6} md={6} xs={6}>
            <div onClick={handleReset} className={classes.denyButton}>
              Reset
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AddHowToUse;