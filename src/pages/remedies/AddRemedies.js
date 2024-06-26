import React, { useCallback, useState } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Colors } from "../../assets/styles.js";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";
import * as RemedyActions from "../../redux/Actions/remediesActions.js";

const AddRemedies = ({ dispatch }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [remedy, setRemedy] = useState("");
  const [error, setError] = useState({ remedy: ""});
  const [description, setDescriptionText] = useState("");
  const [status, setStatus] = useState("");


  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };
  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const validation = () => {
    var isValid = true;
    if (!remedy) {
      handleError("remedy", "Please input Remedy");
      isValid = false;
    }

    if (!description) {
      handleError("description", "Please input Description");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("title", remedy);
      formData.append("description", description);
      formData.append("status", status);

      dispatch(
        RemedyActions.createRemedy(formData)
      );
      handleReset();
      navigate('/displayRemedise')
    }
  };

  const handleReset = useCallback(() => {
    setRemedy("");
    setDescriptionText("");
    setError({ remedy: "" });
    setStatus("")
  });

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Remedies</div>
              <div
                onClick={() => navigate("/displayRemedise")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Remedies</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Enter Remedy"
              error={error.remedy ? true : false}
              helperText={error.remedy}
              value={remedy}
              onFocus={() => handleError("remedy", null)}
              onChange={(event) => setRemedy(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Select Status</InputLabel>
                <Select
                  labelId="select-label"
                  value={status}
                  onChange={handleOptionChange}
                  variant="outlined"
                  error={!!error.status}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="InActive">InActive</MenuItem>
                </Select>
                <div className={classes.errorstyles}>{error.status}</div>
              </FormControl>
            </Grid>
        
          <Grid item lg={12} sm={6} md={6} xs={6}>
            <TextField
              id="outlined-description-static"
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(event) => setDescriptionText(event.target.value)}
              variant="outlined"
              error={error.description ? true : false}
              helperText={error.description}
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

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(null, mapDispatchToProps)(AddRemedies);
