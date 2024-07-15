import React, { useState, useEffect } from "react";
import { useStyles } from "../../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";

import { useNavigate } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import * as countryActions from "../../../redux/Actions/settingActions.js";
import Loader from "../../../Components/loading/Loader.js";

const AddCountry = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [error, setError] = useState({});
  const [status, setStatus] = useState("")
  const [code,setcode]= useState("");
  const [countryValue, setCountryValue] = useState('');



  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    var isValid = true;
    if (!title) {
      handleError("title", "Please input Country Name");
      isValid = false;
    }
    return isValid;
  };


  const handleSubmit = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("title", title);
      formData.append("status", status);
      formData.append("code", code);
      formData.append("countryValue", countryValue);

      dispatch(countryActions.addCountries(formData))
      handleReset();
      navigate('/setting/country')
    }
  };

  const handleReset = () => {
    setTitle("");
    setcode("");
    setStatus("");
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Country</div>
              <div
                onClick={() => navigate("/setting/country")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Countries</div>
              </div>
            </div>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Enter Country Name"
              error={error.title ? true : false}
              helperText={error.title}
              value={title}
              onFocus={() => handleError("title", null)}
              onChange={(event) => setTitle(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          
          <Grid item lg={6} md={6} sm={12} xs={12}>
          <TextField fullWidth label="Country Code" id="fullWidth" value={code} 
                onChange={(e) => setcode(e.target.value)}
          
          />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
          <TextField fullWidth label="Country Value" id="fullWidth" value={countryValue} 
                onChange={(e) => setCountryValue(e.target.value)}
          
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

const mapStateToProps = (state) => ({
//   countryData: state.setting.countryData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddCountry);
