import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import { Grid, TextField } from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";

export const AddFaq = () => {
  var classes = useStyles();
  const navigate = useNavigate();

  const [error, setError] = useState({
    name: "",
    shortBio: "",
  });

  const [name, setName] = useState("");
  const [shortBio, setShortBio] = useState("");
  const [Submit, setSubmit] = useState("");
  const [Reset, setReset] = useState("");

  const handleValidation = () => {
    let isValid = true;
    let newErrors = {};

    // Validate Question
    if (!name.trim()) {
      newErrors.name = "Question is required";
      isValid = false;
    }

    // Validate Description
    if (!shortBio.trim()) {
      newErrors.shortBio = "Description is required";
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (handleValidation()) {
      // Perform submit logic here
      // ...

      // Reset the form
      setName("");
      setShortBio("");
      setError({
        name: "",
        shortBio: "",
      });

      // Optionally, navigate to another page
      navigate("/your-success-page");
    }
  };

  const handleReset = () => {
    // Reset the form
    setName("");
    setShortBio("");
    setError({
      name: "",
      shortBio: "",
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>All FAQs</div>
              <div
                onClick={() => navigate("/displayFaq")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display/AddFaq</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Question"
              value={name}
              variant="outlined"
              fullWidth
              error={!!error.name}
              helperText={error.name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              label="Description"
              value={shortBio}
              variant="outlined"
              fullWidth
              error={!!error.shortBio}
              helperText={error.shortBio}
              onChange={(e) => setShortBio(e.target.value)}
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

export default AddFaq;