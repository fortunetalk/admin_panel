import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import { Grid, TextField } from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";

export const AddMessage = () => {
  var classes = useStyles();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (!name.trim()) {
      errors.name = "Astrology is required";
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
    setName("");
    setValidationErrors({});
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Message</div>
              <div
                onClick={() => navigate("/displayMessage")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>
                  Display/AddMessage
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              label="Astrology"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              fullWidth
              error={Boolean(validationErrors.name)}
              helperText={validationErrors.name}
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

export default AddMessage;