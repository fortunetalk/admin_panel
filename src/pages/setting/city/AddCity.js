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
import * as stateActions from "../../../redux/Actions/settingActions.js";
import Loader from "../../../Components/loading/Loader.js";

const AddCity = ({stateData}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [error, setError] = useState({});
  const [status, setStatus] = useState("")
  const [cityId,setcityId]= useState("")
  const [state, setstate] = useState("")

  useEffect(()=>{
    dispatch(stateActions.getStates())
  },[])


  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    var isValid = true;
    if (!title) {
      handleError("title", "Please input state Name");
      isValid = false;
    }
    return isValid;
  };


  const handleSubmit = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("title", title);
      formData.append("status", status);
      formData.append("stateId", state);

      dispatch(stateActions.addCity(formData))
      handleReset();
      navigate('/setting/city')
    }
  };

  const handleReset = () => {
    setTitle("");
    setcityId("");
    setStatus("");
  };

  const handleOptionChange = (e) => {
    setStatus(e.target.value);
  };

  const fillstateList = () => {
    return stateData.map((item) => {
      return <MenuItem value={item._id}>{item.title}</MenuItem>;
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add City</div>
              <div
                onClick={() => navigate("/setting/city")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Cities</div>
              </div>
            </div>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="state"
                value={state}
                onFocus={() => handleError("state", null)}
                onChange={(e) => setstate(e.target.value)}
                error={error.state ? true : false}
              >
                <MenuItem disabled value={null}>
                  -Select state-
                </MenuItem>
                {stateData && fillstateList()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextField
              label="Enter City Name"
              error={error.title ? true : false}
              helperText={error.title}
              value={title}
              onFocus={() => handleError("title", null)}
              onChange={(event) => setTitle(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          
         
          <Grid item lg={4} sm={12} md={4} xs={12}>
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
  stateData: state.setting.stateData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddCity);
