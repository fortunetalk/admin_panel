import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Grid, TextField, } from "@mui/material";
import { useNavigate } from "react-router-dom";


  export const AddListOfQuestion = () => {
    var classes = useStyles();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
      name: "",
      status: "",
    });
    const [working, setworking] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
  
    const handleValidation = () => {
      let isValid = true;
      const newErrors = { name: "", status: "" };
  
      // Validate Enter Question field
      if (!name.trim()) {
        newErrors.name = "Please enter a question";
        isValid = false;
      }
  
      // Validate Select Title dropdown
      if (status === "") {
        newErrors.status = "Please select a title";
        isValid = false;
      }
  
      setErrors(newErrors);
  
      return isValid;
    };
  
    const handleSubmit = () => {
      if (handleValidation()) {
        // Perform submission logic here
        console.log("Form submitted successfully");
      } else {
        console.log("Form validation failed");
      }
    };
  
    const handleReset = () => {
      // Reset form fields and validation state
      setName("");
      setStatus("");
      setErrors({ name: "", status: "" });
    };
  

  
  console.log(working)
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add ListOfQuestion</div>
              <div
                                onClick={() => navigate("/displayListOfQuestion")}
                                className={classes.addButton}
                            >
                               
                                <div className={classes.addButtontext}>
                                    Display/ListOfQuestion
                                </div>
                            </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select Title </InputLabel>
              <Select
                label="Select Option"
                labelId="select-label"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                variant="outlined"
              >
                <MenuItem value="">Select Title </MenuItem>
                <MenuItem value="Larning">Learning</MenuItem>
              </Select>
              {errors.status && (
                <div className={classes.errorText}>{errors.status}</div>
              )}
            </FormControl>
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Question"
              value={name}
              variant="outlined"
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <div className={classes.errorText}>{errors.name}</div>
            )}
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

export default AddListOfQuestion;