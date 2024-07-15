import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import { Grid, TextField } from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";

export const AddHowToUseVideo = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const handleYoutubeLink = (e) => {
    const value = e.target.value;
    setLink(value);
    if (!value) {
      setError("Please enter a YouTube link.");
    } else {
      setError("");
    }
    const youtubeRegex =
      /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;

    if (!youtubeRegex.test(value)) {
      setError("Please enter a valid YouTube link.");
    }
  };

  const handleSubmit = () => {
  
    if (!link || error) {
   
      return;
    }

  
    setLink("");
    setError("");

   
    navigate("/your-success-page");
  };

  const handleReset = () => {
    
    setLink("");
    setError("");
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>How to use - Videos</div>
              <div
                onClick={() => navigate("/displayHowToUseVideo")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>
                  Display/How To Use Videos
                </div>
              </div>
            </div>
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <label>Youtube Link</label>
            <TextField
              label="Enter Link"
              value={link}
              variant="outlined"
              fullWidth
              onChange={handleYoutubeLink}
            />
            <div className={classes.errorstyles}>{error}</div>
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

export default AddHowToUseVideo;