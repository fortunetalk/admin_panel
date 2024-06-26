import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import { Grid, TextField } from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";

export const AddTitle = () => {
  var classes = useStyles();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [Submit, setSubmit] = useState("");
  const [Reset, setReset] = useState("");

  const handleValidation = () => {
    if (title.trim() === "") {
      setError("Title is required");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      console.log("Form submitted successfully");
    }
  };

  const handleReset = () => {
    setTitle("");
    setError("");
  
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Title</div>
              <div
                onClick={() => navigate("/displayTitle")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display/Add Title</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Title"
              value={title}
              variant="outlined"
              fullWidth
              error={!!error}
              helperText={error}
              onChange={(e) => setTitle(e.target.value)}
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

export default AddTitle;