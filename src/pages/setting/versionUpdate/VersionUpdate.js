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

const VersionUpdate = ({countryData}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [error, setError] = useState({});
  const [status, setStatus] = useState("")
  const [countryId,setcountryId]= useState("")
  const [country, setcountry] = useState("")

  useEffect(()=>{
    dispatch(countryActions.getCountries())
  },[])


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
      formData.append("countryId", country);

      dispatch(countryActions.addState(formData))
      navigate('/setting/state')
    }
  };


  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const fillCountryList = () => {
    return countryData.map((item) => {
      return <MenuItem value={item._id}>{item.title}</MenuItem>;
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>App Version Update</div>
            </div>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Version Name"
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
            <TextField
              label="Code"
              error={error.title ? true : false}
              helperText={error.title}
              value={title}
              onFocus={() => handleError("title", null)}
              onChange={(event) => setTitle(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          
          <Grid item lg={3} sm={3} md={3} xs={3}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              Update
            </div>
          </Grid>
         
        </Grid>

        <Grid container spacing={2} style={{marginTop:'50px'}}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Customer Version Update</div>
            </div>
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Version Name"
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
            <TextField
              label="Code"
              error={error.title ? true : false}
              helperText={error.title}
              value={title}
              onFocus={() => handleError("title", null)}
              onChange={(event) => setTitle(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          
          <Grid item lg={3} sm={3} md={3} xs={3}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
            Update
            </div>
          </Grid>
       
        </Grid>
      </div>
    </div>
  );

};

const mapStateToProps = (state) => ({
  countryData: state.setting.countryData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(VersionUpdate);
